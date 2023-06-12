import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ServiceStory} from "../../shared/models/servicestory.model";
import {ServiceStoryEdge} from "../../shared/models/servicestoryedge.model";
import {lastValueFrom, Subscription} from "rxjs";
import {Edge, Node} from "@swimlane/ngx-graph";
import {ServiceStoryService} from "../../shared/services/servicestory.service";
import {MicroserviceService} from "../../shared/services/microservice.service";
import * as uniqolor from 'uniqolor';
import {ServiceStoryEdgeService} from "../../shared/services/service-story-edge.service";
import {Microservice} from "../../shared/models/microservice.model";

@Component({
  selector: 'app-widget-system-overview',
  templateUrl: './widget-system-overview.component.html',
  styleUrls: ['./widget-system-overview.component.scss']
})
export class WidgetSystemOverviewComponent implements OnInit {

  @Input() sysId: number = 0;

  // Arrays for fetching the data
  stories: ServiceStory[] = [];
  microservices: Microservice[] = [];

  // Stuff for displaying the ServiceStories
  graphNodes: Node[] = [];
  graphEdges: Edge[] = [];
  nodesReady: boolean = false;
  edgesReady: boolean = false;
  layoutSettings = {
    orientation: 'LR'
  };

  constructor(private storyService: ServiceStoryService,
              private microserviceService: MicroserviceService,
              private edgeService: ServiceStoryEdgeService) {
  }

  async ngOnInit(): Promise<void> {
    const initialQueries = [];
    //get all necessary data objects as parallel executed promises
    initialQueries.push(lastValueFrom(this.storyService.getServiceStories(this.sysId)));
    initialQueries.push(lastValueFrom(this.microserviceService.getMicroservices(this.sysId)));
    const results = await Promise.all(initialQueries)
    this.stories = <ServiceStory[]>results[0];
    this.microservices = <Microservice[]>results[1];

    this.buildEdges(this.stories)
    this.buildNodes(this.microservices)
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
    this.edgesReady = true;
  }


  private async buildNodes(services: Microservice[]): Promise<void> {
    for (const service of services) {
      let node= <Node>{
        id: "ms" + service!!.id,
        label: service!!.name
      }
      this.graphNodes.push(node)
    }
    this.nodesReady = true;
  }

  protected readonly uniqolor = uniqolor;

}
