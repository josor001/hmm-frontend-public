import {Component, OnDestroy, OnInit} from '@angular/core';
import {Team} from "../../shared/models/team.model";
import {Subscription} from "rxjs";
import {MicroserviceService} from "../../shared/services/microservice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TeamService} from "../../shared/services/team.service";

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit, OnDestroy {
  newTeam: Team | undefined;
  sub: Subscription | undefined;

  constructor(private teamService: TeamService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.newTeam = {name: ""}
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  abort(): void {
    this.router.navigate(['/teams']);
  }

  save() {
    if (this.newTeam && this.newTeam.name) {
      this.sub = this.teamService.createTeam(this.newTeam.name).subscribe(
          newTeam => {
            this.openSnackBar("New team " + newTeam.name + " saved!", "SUCCESS");
            this.router.navigate(['/teams']);
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