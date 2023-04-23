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
  sysId: number = 0;

  newTeam: Team | undefined;
  sub: Subscription | undefined;
  routerSysSub: Subscription | undefined;
  constructor(private teamService: TeamService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.routerSysSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.sysId = parseInt(<string>params.get('sysId'));
    });

    this.newTeam = {name: ""}
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    if (this.routerSysSub) this.routerSysSub.unsubscribe();
  }

  abort(): void {
    this.router.navigate([`/system/${(this.sysId)}/teams`]);
  }

  save() {
    if (this.newTeam && this.newTeam.name) {
      this.sub = this.teamService.createTeam(this.newTeam.name, this.sysId).subscribe(
          newTeam => {
            this.openSnackBar("New team " + newTeam.name + " saved!", "SUCCESS");
            this.router.navigate([`/system/${this.sysId}/teams`]);
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