import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ServiceStoryService} from "../../shared/services/servicestory.service";
import * as uniqolor from "uniqolor";
import {ServiceStory} from "../../shared/models/servicestory.model";

@Component({
  selector: 'app-widget-stories',
  templateUrl: './widget-stories.component.html',
  styleUrls: ['./widget-stories.component.scss']
})
export class WidgetStoriesComponent implements OnInit, OnDestroy {
  numberOfStories: number = 0;
  stories: ServiceStory[] = [];
  sub: Subscription | undefined;
  @Input() sysId: number = 0;
  constructor(private storyService: ServiceStoryService) {
  }

  ngOnInit(): void {
    this.sub = this.storyService.getServiceStories(this.sysId).subscribe(stories => {
      this.numberOfStories = stories.length;
      this.stories = stories;
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  protected readonly uniqolor = uniqolor;
}
