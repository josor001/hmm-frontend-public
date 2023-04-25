import {Component, OnDestroy, OnInit} from '@angular/core';
import {Microservice} from "../../shared/models/microservice.model";
import {forkJoin, lastValueFrom, Observable, Subscription} from "rxjs";
import {MicroserviceService} from "../../shared/services/microservice.service";
import {MemberService} from "../../shared/services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ServiceStory} from "../../shared/models/servicestory.model";
import {ServiceStoryService} from "../../shared/services/servicestory.service";
import {ServiceStoryEdge} from "../../shared/models/servicestoryedge.model";
import {ServiceStoryEdgeService} from "../../shared/services/service-story-edge.service";
import {MatSelectionListChange} from "@angular/material/list";


export interface SimpleEdge {
    sourceId: number;
    targetId: number;
    desc: string;
}

@Component({
    selector: 'app-edit-story',
    templateUrl: './edit-story.component.html',
    styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit, OnDestroy {
    sysId: number = 0;

    editStory: ServiceStory | undefined;
    editEdges: ServiceStoryEdge[] = [];
    editEdgesWithId: ServiceStoryEdge[] = [];
    selectedMicroservices: Microservice[] = [];
    allMicroservices: Microservice[] = [];

    routerSub: Subscription | undefined;
    storySub: Subscription | undefined;
    allServiceSub: Subscription | undefined;
    updateSub: Subscription | undefined;
    routerSysSub: Subscription | undefined;

    compareFunction = (o1: any, o2: any) => o1.id === o2.id;

    constructor(private microserviceService: MicroserviceService,
                private storyService: ServiceStoryService,
                private edgeService: ServiceStoryEdgeService,
                private memberService: MemberService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.routerSysSub = this.activatedRoute.paramMap.subscribe((params) => {
            this.sysId = parseInt(<string>params.get('sysId'));
        });

        this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
            var id: number = parseInt(<string>params.get('id'))
            this.storySub = this.storyService.getServiceStory(id).subscribe(
                (story) => {
                    this.editStory = story;
                    if (this.editStory) {
                        this.allServiceSub = this.microserviceService.getMicroservices(this.sysId).subscribe(services => {
                            // get all microservices
                            this.allMicroservices = services;

                            //fill the selectedMicroservices array with the actual starting vertices based on all microservices
                            this.editStory?.vertexIds?.forEach(vertexId => {
                                console.log("VertexID already included" + JSON.stringify(vertexId))
                                let tempService = this.allMicroservices.find(value => value.id === vertexId)
                                if (tempService) this.selectedMicroservices.push(tempService)
                            })
                            console.log("these values are here for allMicroservices: " + JSON.stringify(this.allMicroservices))
                            console.log("these values are here for selectedMicroservices: " + JSON.stringify(this.selectedMicroservices))
                        })


                        //fill the editEdge array with the actual starting values
                        this.editStory?.directedEdgeIds?.forEach(edgeId => {
                            this.edgeService.getServiceStoryEdge(edgeId).subscribe(edge => {
                                this.editEdges.push(edge);
                            })
                        })
                    }
                }
            )
        });
    }

    ngOnDestroy(): void {
        this.routerSub?.unsubscribe();
        this.allServiceSub?.unsubscribe();
        this.updateSub?.unsubscribe();
        this.storySub?.unsubscribe();
        this.routerSysSub?.unsubscribe();
    }

    async save(): Promise<void> {
      //TODO edges that were removed are currently NOT removed from the backend, i.e. there are a bunch of edges that are not used.
      //TODO we need to take care of this probably in the backend and not frontend. For the test we leave it as is.
        if (this.editStory && this.editStory.name && this.checkIfEdgesFilled()) {
            const promises: any[] = [];
            this.editEdges.forEach(oldEdge => {
                if (oldEdge.id) {
                    promises.push(lastValueFrom(this.edgeService.updateServiceStoryEdge(oldEdge)))
                } else {
                    promises.push(lastValueFrom(this.edgeService.createServiceStoryEdge(oldEdge.sourceId!, oldEdge.targetId!, oldEdge.description!, this.editStory!.sysId!)))
                }
            })
            const updatedEdges = await Promise.all(promises)
            updatedEdges.forEach(updatedEdge => {
                this.editEdgesWithId.push(updatedEdge)
            })

            this.editStory.directedEdgeIds = this.editEdgesWithId.map(e => e.id!)
            this.editStory.vertexIds = this.selectedMicroservices.map(ms => ms.id!)
            this.updateSub = this.storyService.updateServiceStory(this.editStory).subscribe(story => {
                this.openSnackBar(`${story.name} updated!`, "SUCCESS")
                this.router.navigate([`/system/${this.sysId}/stories`]);
            })
        } else {
            this.openSnackBar("Something went wrong. Please fill all required fields.", "ERROR")
        }
    }

    abort() {
        this.router.navigate([`/system/${this.sysId}/stories`]);
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    addEdge() {
        this.editEdges.push({})
    }

    removeEdge(edge: ServiceStoryEdge) {
        const index = this.editEdges.indexOf(edge, 0);
        if (index > -1) {
            this.editEdges.splice(index, 1);
        }
    }

    //checks if targetId and sourceId is filled for each edge. does not check for duplicates!
    private checkIfEdgesFilled(): boolean {
        return this.editEdges.every((e) => e.targetId !== undefined && e.sourceId !== undefined)
    }
}