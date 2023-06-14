import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from "../../shared/services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Softwaresystem} from "../../shared/models/softwaresystem.model";
import {Subscription} from "rxjs";
import {SoftwaresystemService} from "../../shared/services/softwaresystem.service";

@Component({
  selector: 'app-new-system',
  templateUrl: './new-system.component.html',
  styleUrls: ['./new-system.component.scss']
})
export class NewSystemComponent implements OnInit, OnDestroy {
  newSystem : Softwaresystem | undefined;

  systemSub : Subscription | undefined;
  routerSub : Subscription | undefined;

  constructor(private systemService : SoftwaresystemService,
              private router: Router,
              private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.newSystem = {name: "", description: ""}
  }
  ngOnDestroy() {
    this.systemSub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }
  abort(): void {
    this.router.navigate([`/`]);
  }
  save() {
    if(this.newSystem && this.newSystem.name && this.newSystem.description) {
      this.systemSub = this.systemService.createSoftwaresystem(this.newSystem.name, this.newSystem.description).subscribe(
          newSys => {
            this.openSnackBar("New system "+newSys.name+"with id "+newSys.id+" added to existing systems.", "SUCCESS");
            window.location.reload();
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
