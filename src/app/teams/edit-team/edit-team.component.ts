import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {TeamService} from "../../shared/services/team.service";
import {Member} from "../../shared/models/member.model";
import {Team} from "../../shared/models/team.model";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {
  editTeam: Team | undefined;
  routerSub: Subscription | undefined;
  serviceSub: Subscription | undefined;
  constructor(private teamService:TeamService, private activatedRoute:ActivatedRoute,
                            private router: Router,
                            private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
      var id : number = parseInt(<string>params.get('id'))
      console.log(id);
      this.serviceSub = this.teamService.getTeam(id).subscribe(
          (team) => {this.editTeam = team;}
      )
    });
  }

  save() {

  }

  abort() {

  }
}
