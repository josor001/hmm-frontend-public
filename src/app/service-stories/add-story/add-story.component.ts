import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ServiceStory} from "../../shared/models/servicestory.model";
import {ServiceStoryService} from "../../shared/services/servicestory.service";

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent {
  newStory: ServiceStory | undefined;
  sub: Subscription | undefined;

  constructor(private storyService: ServiceStoryService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.newStory = {name: ""}
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  abort(): void {
    this.router.navigate(['/stories']);
  }

  save() {
    if (this.newStory && this.newStory.name) {
      this.sub = this.storyService.createServiceStory(this.newStory.name).subscribe(
          newStory => {
            this.openSnackBar("New story " + newStory.name + " saved!", "SUCCESS");
            this.router.navigate(['/stories']);
          }
      );
    } else {
      this.openSnackBar("Something went wrong. Please fill in all fields.", "ERROR");
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
