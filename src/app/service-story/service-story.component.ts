import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {Edge, Node} from "@swimlane/ngx-graph";
import {ServiceStory} from "../shared/models/servicestory.model";
import {Subscription} from "rxjs";
import {ServiceStoryEdge} from "../shared/models/servicestoryedge.model";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TeamService} from "../shared/services/team.service";
import {MemberService} from "../shared/services/member.service";
import {MicroserviceService} from "../shared/services/microservice.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ServiceStoryService} from "../shared/services/servicestory.service";
import {ServiceStoryEdgeService} from "../shared/services/service-story-edge.service";
import {Microservice} from "../shared/models/microservice.model";

@Component({
  selector: 'app-service-story',
  templateUrl: './service-story.component.html',
  styleUrls: ['./service-story.component.scss']
})
export class ServiceStoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  storyNodes = new Map<number, Node[]>();
  storyEdges = new Map<number, Edge[]>();
  //set  layout of graphs to "from left to right"
  layoutSettings = {
    orientation: 'LR'
  };

  stories : ServiceStory[] = [];
  edges : ServiceStoryEdge[] = [];
  services : Microservice[] = [];

  allStoriesSub : Subscription | undefined;
  allEdgesSub : Subscription | undefined;
  allServicesSub : Subscription | undefined;
  constructor(
              private storyService: ServiceStoryService,
              private edgeService: ServiceStoryEdgeService,
              private microserviceService: MicroserviceService,
              private snackBar: MatSnackBar) {
  }

  ngOnDestroy(): void {
    this.allStoriesSub?.unsubscribe()
    this.allEdgesSub?.unsubscribe()
    this.allServicesSub?.unsubscribe()
  }

  ngOnInit(): void {
    //get all stories
    this.allStoriesSub = this.storyService.getServiceStories().subscribe(stories => {
      this.stories = stories;
    })
    //get all edges
    this.allEdgesSub = this.edgeService.getServiceStoryEdges().subscribe(edges => {
      this.edges = edges;
    })
    //get all services
    this.allServicesSub = this.microserviceService.getMicroservices().subscribe(services => {
      this.services = services;
    })
    this.buildNodes();
    this.buildLinks();
  }

  private buildNodes() : void {
    this.stories.forEach(story => {
      if (story.id != null) {
        let nodes : Node[] = [];

        if(story.vertexIds) {
          story.vertexIds.forEach(value => {
            let service = this.services.find(ms => ms.id===value)
            if(service)
              nodes.push({id : "ms"+service.id, label : service.name})
          })
        }
        this.storyNodes.set(story.id, nodes)
      }
    })
  }

  private buildLinks() {
    this.stories.forEach(story => {
      if (story.id != null) {
        let edges : Edge[] = [];

        if(story.directedEdgeIds) {
          story.directedEdgeIds.forEach(value => {
            let edge = this.edges.find(edge => edge.id===value)
            if(edge && edge.targetId && edge.sourceId)
              edges.push({id : "e"+edge.id, label : edge.description, source : "ms"+edge.sourceId, target : "ms"+edge.targetId})
          })
        }
        this.storyEdges.set(story.id, edges)
      }
    })
  }


}
