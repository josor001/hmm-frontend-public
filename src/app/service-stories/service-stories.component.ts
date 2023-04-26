import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {Edge, Node} from "@swimlane/ngx-graph";
import {ServiceStory} from "../shared/models/servicestory.model";
import {lastValueFrom, Subscription} from "rxjs";
import {ServiceStoryEdge} from "../shared/models/servicestoryedge.model";
import {MicroserviceService} from "../shared/services/microservice.service";
import {ServiceStoryService} from "../shared/services/servicestory.service";
import {ServiceStoryEdgeService} from "../shared/services/service-story-edge.service";
import {Microservice} from "../shared/models/microservice.model";
import {MemberService} from "../shared/services/member.service";
import {TeamService} from "../shared/services/team.service";
import {ActivatedRoute} from "@angular/router";
import {Member} from "../shared/models/member.model";
import {Team} from "../shared/models/team.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-service-stories',
    templateUrl: './service-stories.component.html',
    styleUrls: ['./service-stories.component.scss']
})
export class ServiceStoriesComponent implements OnInit, OnDestroy {
    sysId: number = 0;

    @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
    storyNodes = new Map<number, Node[]>();
    storyEdges = new Map<number, Edge[]>();
    //set  layout of graphs to "from left to right"
    layoutSettings = {
        orientation: 'LR'
    };

    stories: ServiceStory[] = [];
    edges: ServiceStoryEdge[] = [];
    services: Microservice[] = [];

    allStoriesSub: Subscription | undefined;
    allEdgesSub: Subscription | undefined;
    allServicesSub: Subscription | undefined;
    routerSysSub: Subscription | undefined;
    nodesReady: boolean = false;

    constructor(
        private storyService: ServiceStoryService,
        private edgeService: ServiceStoryEdgeService,
        private microserviceService: MicroserviceService,
        private memberService: MemberService,
        private teamService: TeamService,
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnDestroy(): void {
        this.allStoriesSub?.unsubscribe()
        this.allEdgesSub?.unsubscribe()
        this.allServicesSub?.unsubscribe()
        this.routerSysSub?.unsubscribe()
    }

    async ngOnInit(): Promise<void> {
        this.routerSysSub = this.activatedRoute.paramMap.subscribe((params) => {
            this.sysId = parseInt(<string>params.get('sysId'));
        });
        const initialQueries = [];
        //get all necessary data objects as parallel executed promises
        initialQueries.push(lastValueFrom(this.storyService.getServiceStories(this.sysId)));
        initialQueries.push(lastValueFrom(this.edgeService.getServiceStoryEdges(this.sysId)));
        initialQueries.push(lastValueFrom(this.microserviceService.getMicroservices(this.sysId)));
        const results = await Promise.all(initialQueries)
        this.stories = <ServiceStory[]>results[0];
        this.edges = <ServiceStoryEdge[]>results[1];
        this.services = <Microservice[]>results[2];
        this.buildNodes();
        this.buildLinks();
        this.nodesReady = true;
    }

    private buildNodes(): void {
        this.stories.forEach(story => {
            if (story.id != null) {
                const nodePromises: Promise<Node>[] = [];
                if (story.vertexIds) {
                    story.vertexIds.forEach(vertexId => {
                        const searchService = this.services.find(ms => ms.id === vertexId)
                        if (searchService) {
                            nodePromises.push(this.buildNodeById(vertexId))
                        }
                    })
                }
                Promise.all(nodePromises).then(nodes => {
                    this.storyNodes.set(story.id!, nodes)
                })
            }
        })
    }

    buildLinks(): void {
        this.stories.forEach(story => {
            if (story.id != null) {
                let edges: Edge[] = [];

                if (story.directedEdgeIds) {
                    story.directedEdgeIds.forEach(value => {
                        let edge = this.edges.find(edge => edge.id === value)
                        if (edge && edge.targetId && edge.sourceId)
                            edges.push({
                                id: "e" + edge.id,
                                label: edge.description,
                                source: "ms" + edge.sourceId,
                                target: "ms" + edge.targetId
                            })
                    })
                }
                this.storyEdges.set(story.id, edges)
            }
        })
    }

    private async buildNodeById(vertexId: number): Promise<Node> {
        //select microservice to build node from
        let service = this.services.find(ms => ms.id === vertexId)
        if (service) {
            //get the name of a possible contact person
            var spocName = ""
            if (service.contactPersonId) {
                const member = await lastValueFrom(this.memberService.getMember(service.id!))
                spocName = `${member.firstname} ${member.lastname}`
            }
            //get the name of a possible team which owns the service
            var owningTeamName = ""
            const team = await lastValueFrom(this.teamService.getTeamByMicroserviceId(service.id!))
            if (team) {
                owningTeamName = team.name!!
            }
            //build the node to return
            return <Node>{
                id: "ms" + service!!.id,
                label: service!!.name,
                data: {ownedBy: owningTeamName, spoc: spocName}
            }
        }
        return <Node>{};
    }

    deleteStory(id: number) {
        this.storyService.deleteServiceStory(id).subscribe(
            value => {
                this.openSnackBar("Story deleted.", "SUCCESS");
                this.storyService.getServiceStories(this.sysId).subscribe(newStories => {
                    this.stories = newStories;
                })
            }
        )
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
