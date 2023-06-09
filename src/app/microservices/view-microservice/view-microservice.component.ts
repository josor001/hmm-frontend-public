import {Component, OnDestroy, OnInit} from '@angular/core';
import {Microservice} from "../../shared/models/microservice.model";
import {Member} from "../../shared/models/member.model";
import {lastValueFrom, Subscription} from "rxjs";
import {MicroserviceService} from "../../shared/services/microservice.service";
import {TeamService} from "../../shared/services/team.service";
import {MemberService} from "../../shared/services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HighlightAutoResult, HighlightLoader} from "ngx-highlightjs";
import {Team} from "../../shared/models/team.model";
import {ModelArtifactService} from "../../shared/services/modelartifact.service";
import {ModelArtifact} from "../../shared/models/modelartifact.model";
import {ServiceStoryService} from "../../shared/services/servicestory.service";
import {ServiceStoryEdgeService} from "../../shared/services/service-story-edge.service";
import {ServiceStory} from "../../shared/models/servicestory.model";
import {ClusterNode, Edge, Node} from "@swimlane/ngx-graph";
import {ServiceStoryEdge} from "../../shared/models/servicestoryedge.model";
import * as uniqolor from "uniqolor";

//const themeGithub: string = '../node_modules/highlight.js/styles/github.css';
//const themeGithubDark: string = 'node_modules/highlight.js/styles/github-dark.css';

@Component({
    selector: 'app-view-microservice',
    templateUrl: './view-microservice.component.html',
    styleUrls: ['./view-microservice.component.scss']
})
export class ViewMicroserviceComponent implements OnInit, OnDestroy {
    sysId: number = 0;

    microservice: Microservice | undefined;
    microserviceTeam: Team | undefined;
    microserviceTeamMember: Member[] = [];
    microserviceArtifacts: ModelArtifact[] = [];
    microserviceStories: ServiceStory[] = [];

    routerSub: Subscription | undefined;
    serviceSub: Subscription | undefined;
    routerSysSub: Subscription | undefined;
    teamSub: Subscription | undefined;
    modelSub: Subscription | undefined;
    storySub: Subscription | undefined;
    //currentTheme: string = themeGithub;

    response: HighlightAutoResult | undefined;

    // Stuff for displaying the ServiceStories
    graphNodes : Node[] = [];
    graphEdges: Edge[] = [];
    graphClusters: ClusterNode[] = [];
    nodesReady: boolean = false;
    layoutSettings = {
        orientation: 'LR'
    };

    // Stuff for Code Highlighting with highlightJS
    typescript = `function myFunction() {
    document.getElementById("demo1").innerHTML = "Test 1!";
    document.getElementById("demo2").innerHTML = "Test 2!";
  }`;

    lemma_str = `context Delivery {
    structure Courier<aggregate, entity> {
        long id<identifier>,
        Plan plan<part>,
        boolean available,
        function ActionList actionsForDelivery(long deliveryId),
        procedure noteAvailable(),
        procedure addAction(Action action),
        procedure cancelDelivery(long deliveryId),
        function Courier create(long courierId)  //STATIC
    }

    structure Action<valueObject> {
      immutable DeliveryAPI::Web.DeliveryActionType type,
      immutable Common::Common.Address address,
      immutable date time,
      immutable long deliveryId,
      function boolean actionFor(long deliveryId)<sideEffectFree>,
      function Action makePickup(long deliveryId, Common::Common.Address pickupAddress, date pickupTime)<sideEffectFree>,
      function Action makeDropoff(long deliveryId, Common::Common.Address deliveryAddress, date deliveryTime)<sideEffectFree>
    }

    collection ActionList {Action action}
    }`;


    lemma_highlighted: string | undefined;

    constructor(private microserviceService: MicroserviceService,
                private teamService: TeamService,
                private memberService: MemberService,
                private modelArtifactService: ModelArtifactService,
                private storyService: ServiceStoryService,
                private edgeService: ServiceStoryEdgeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
                private hljsLoader: HighlightLoader) {
    }


    ngOnInit(): void {
        this.routerSysSub = this.activatedRoute.paramMap.subscribe((params) => {
            this.sysId = parseInt(<string>params.get('sysId'));

        });

        this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
            var id: number = parseInt(<string>params.get('id'))
            this.serviceSub = this.microserviceService.getMicroservice(id).subscribe(
                microservice => {
                    //if there is a service found, set this as the to be viewed service
                    this.microservice = microservice;
                    // get all other data to be displayed based on the set viewService
                    this.getTeamAndMembers(this.microservice.id!!)
                    this.getArtifacts(this.microservice.id!!)
                    this.getStories(this.microservice.id!!)
                }
            )
        });
    }


    getTeamAndMembers(microserviceId: number) {
        this.teamSub = this.teamService.getTeamByMicroserviceId(microserviceId).subscribe(team => {
            this.microserviceTeam = team
            team.memberIds?.forEach(memberId => {
                this.memberService.getMember(memberId).subscribe(newMember => this.microserviceTeamMember.push(newMember))
            })
        })
    }

    getArtifacts(microserviceId: number) {
        this.modelSub = this.modelArtifactService.getModelArtifactsByMicroserviceId(microserviceId).subscribe(artifacts => {
            this.microserviceArtifacts = artifacts;
        })
    }

    async getStories(microserviceId: number) {
        this.storySub = this.storyService.getServiceStoriesContainingMicroservice(microserviceId).subscribe(async stories => {
            this.microserviceStories = stories;
            await this.buildEdges(stories);
            await this.buildNodes(stories);
            //get rid of duplicate node entries
            this.graphNodes = this.graphNodes.filter(
                (node, i, arr) => arr.findIndex(t => t.id === node.id) === i
            )
            this.nodesReady = true;
        })
    }

    ngOnDestroy(): void {
        this.routerSysSub?.unsubscribe();
        this.routerSub?.unsubscribe();
        this.modelSub?.unsubscribe();
        this.teamSub?.unsubscribe();
        this.serviceSub?.unsubscribe();
        this.storySub?.unsubscribe();
    }

    deleteMicroservice(id: number) {
        this.microserviceService.deleteMicroservice(id).subscribe(
            value => {
                this.router.navigate([`/system/${(this.sysId)}/microservices`]).then(value1 => {
                    this.openSnackBar("Microservice deleted.", "SUCCESS");
                });
            }
        )
    }


    private async buildEdges(stories: ServiceStory[]) {
        for (const story of stories) {
            if (story.id != null) {
                let storyEdges: ServiceStoryEdge[] = [];
                if (story.directedEdgeIds) {
                    const edgeQueries = [];
                    //fetch all necessary edges from backend
                    for (const id of story.directedEdgeIds) {
                        edgeQueries.push(lastValueFrom(this.edgeService.getServiceStoryEdge(id)));
                    }
                    storyEdges = await Promise.all(edgeQueries)
                }
                storyEdges.forEach(edge => {
                    if (edge && edge.targetId && edge.sourceId) {
                        // create the corresponding ngx-graph edge for each story edge
                        this.graphEdges.push(<Edge>{
                            id: "e" + edge.id,
                            label: edge.description,
                            data: {color: uniqolor(story.name!!).color},
                            source: "ms" + edge.sourceId,
                            target: "ms" + edge.targetId
                        })
                    }
                })
            }
        }
    }


    private async buildNodes(stories: ServiceStory[]): Promise<void> {
        for (const story of stories) {
            if (story.id != null) {
                if (story.vertexIds) {
                    const nodeQueries = [];
                    //fetch all necessary node, i.e., microservices, from backend
                    for (const id of story.vertexIds) {
                        nodeQueries.push(lastValueFrom(this.microserviceService.getMicroservice(id)));
                    }
                    const microservices = await Promise.all(nodeQueries)
                    //CREATE NODES FOR EACH STORY
                    for (const microservice of microservices) {
                        let node= <Node>{
                            id: "ms" + microservice!!.id,
                            label: microservice!!.name
                        }
                        this.graphNodes.push(node)
                    }
                }
            }
        }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    protected readonly Array = Array;
    protected readonly uniqolor = uniqolor;
}
