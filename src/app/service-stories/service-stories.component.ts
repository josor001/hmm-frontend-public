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
        //get all stories
        initialQueries.push(lastValueFrom(this.storyService.getServiceStories(this.sysId)));
        // this.allStoriesSub = this.storyService.getServiceStories(this.sysId).subscribe(stories => {
        //     this.stories = stories;
        // })
        //get all edges
        initialQueries.push(lastValueFrom(this.edgeService.getServiceStoryEdges(this.sysId)));
        // this.allEdgesSub = this.edgeService.getServiceStoryEdges(this.sysId).subscribe(edges => {
        //     this.edges = edges;
        // })
        //get all services
        initialQueries.push(lastValueFrom(this.microserviceService.getMicroservices(this.sysId)));
        // this.allServicesSub = this.microserviceService.getMicroservices(this.sysId).subscribe(services => {
        //     this.services = services;
        // })
        // Promise.all(initialQueries).then(results => {
        //     this.stories = <ServiceStory[]>results[0];
        //     this.edges = <ServiceStoryEdge[]>results[1];
        //     this.services = <Microservice[]>results[2];
        //     this.buildNodes();
        //     this.buildLinks();
        // })
        const results = await Promise.all(initialQueries)
        this.stories = <ServiceStory[]>results[0];
        this.edges = <ServiceStoryEdge[]>results[1];
        this.services = <Microservice[]>results[2];
        console.log("TEST LOG", this.stories, this.edges, this.services)
        this.buildNodes();
        this.buildLinks(); //already sync method
        console.log("Story Edges", this.storyEdges)
    }

    private buildNodes(): void {
        this.stories.forEach(story => {
            if (story.id != null) {
                let nodes: Node[] = [];
                if (story.vertexIds) {
                    story.vertexIds.forEach(value => {
                        const vertexQueries = [];
                        let service = this.services.find(ms => ms.id === value)
                        if (service) {
                            var spocName = ""
                            if (service.contactPersonId) {
                                vertexQueries.push(lastValueFrom(this.memberService.getMember(service.id!)))
                            }
                            var owningTeamName = ""
                            vertexQueries.push(lastValueFrom(this.teamService.getTeamByMicroserviceId(service.id!)))
                            Promise.all(vertexQueries).then(queryResults => {
                                queryResults.forEach(result => {
                                    if((<Team>result).name) owningTeamName = (<Team>result).name!
                                    if((<Member>result).firstname) spocName = `${(<Member>result).firstname} ${(<Member>result).lastname}`
                                    console.log("vertexQuery results:", result, owningTeamName, spocName)
                                })
                                nodes.push({
                                    id: "ms" + service!!.id, label: service!!.name, data: {
                                        ownedBy: owningTeamName,
                                        spoc: spocName
                                    }
                                })
                            })
                        }
                    })
                }
                this.storyNodes.set(story.id, nodes)
            }
        })
    }

    buildLinks() : void {
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


    getLinks(edges: Edge[] | undefined) {
        console.log("getLinks triggered", edges)
        if (edges) return edges;
        else return [];
    }

    getNodes(nodes: Node[] | undefined) {
        console.log("getNodes triggered", nodes)
        if (nodes) return nodes;
        else return [];
    }
}
