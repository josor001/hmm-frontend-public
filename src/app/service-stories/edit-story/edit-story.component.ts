import {Component, OnDestroy, OnInit} from '@angular/core';
import {Microservice} from "../../shared/models/microservice.model";
import {Subscription} from "rxjs";
import {MicroserviceService} from "../../shared/services/microservice.service";
import {MemberService} from "../../shared/services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ServiceStory} from "../../shared/models/servicestory.model";
import {ServiceStoryService} from "../../shared/services/servicestory.service";
import {ServiceStoryEdge} from "../../shared/models/servicestoryedge.model";
import {ServiceStoryEdgeService} from "../../shared/services/service-story-edge.service";


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
          }
      )
    });

    this.allServiceSub = this.microserviceService.getMicroservices(this.sysId).subscribe(services => {
      this.allMicroservices = services;
    })

    //fill the selectedMicroservices array with the actual starting vertices
    this.editStory?.vertexIds?.forEach(vertexId => {
      this.microserviceService.getMicroservice(vertexId).subscribe(ms => {
        this.selectedMicroservices.push(ms);
      })
    })

    //fill the editEdge array with the actual starting values
    this.editStory?.directedEdgeIds?.forEach(edgeId => {
      this.edgeService.getServiceStoryEdge(edgeId).subscribe(edge => {
        this.editEdges.push(edge);
      })
    })



  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.allServiceSub?.unsubscribe();
    this.updateSub?.unsubscribe();
    this.storySub?.unsubscribe();
    this.routerSysSub?.unsubscribe();
  }

  save() :void {
    if(this.editStory && this.editStory.name && this.checkIfEdgesFilled())  {
      this.editEdges.forEach(oldEdge => {

        if(oldEdge.id) {
          //it is an already persisted edge
          this.edgeService.updateServiceStoryEdge(oldEdge).subscribe(updatedEdge => {
            this.editEdgesWithId.push(updatedEdge);
          })
        } else {
          //if it is a completely new edge
          this.edgeService.createServiceStoryEdge(oldEdge.sourceId!, oldEdge.targetId!, oldEdge.description!).subscribe(newEdge => {
            this.editEdgesWithId.push(newEdge);
          })
        }
      })
      this.editStory.directedEdgeIds = this.editEdgesWithId.map(e => e.id!)
      this.editStory.vertexIds = this.selectedMicroservices.map(ms => ms.id!)

      this.updateSub = this.storyService.updateServiceStory(this.editStory).subscribe(story => {
        console.log(story)
        this.openSnackBar(`${story.name} updated!`,"SUCCESS")
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
  removeEdge(edge : ServiceStoryEdge) {
    const index = this.editEdges.indexOf(edge, 0);
    if (index > -1) {
      this.editEdges.splice(index, 1);
    }
  }

  //checks if targetId and sourceId is filled for each edge. does not check for duplicates!
  private checkIfEdgesFilled() : boolean {
    return this.editEdges.every((e) => e.targetId !== undefined && e.sourceId !== undefined)
  }

  consoleLog(item: any) {
    console.log(item)
  }
}