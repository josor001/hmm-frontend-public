import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ServiceStoryService} from "../../shared/services/servicestory.service";

@Component({
  selector: 'app-widget-stories',
  templateUrl: './widget-stories.component.html',
  styleUrls: ['./widget-stories.component.scss']
})
export class WidgetStoriesComponent implements OnInit, OnDestroy {
  numberOfStories: number = 0;
  sub: Subscription | undefined;

  constructor(private storyService: ServiceStoryService) {
  }

  ngOnInit(): void {
    this.sub = this.storyService.getServiceStories().subscribe(stories => {
      this.numberOfStories = stories.length
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}
