import {Component, OnDestroy, OnInit} from '@angular/core';
import {Microservice} from "../../shared/models/microservice.model";
import {Member} from "../../shared/models/member.model";
import {Subscription} from "rxjs";
import {MicroserviceService} from "../../shared/services/microservice.service";
import {TeamService} from "../../shared/services/team.service";
import {MemberService} from "../../shared/services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-microservice',
  templateUrl: './view-microservice.component.html',
  styleUrls: ['./view-microservice.component.scss']
})
export class ViewMicroserviceComponent implements OnInit, OnDestroy {
  sysId: number = 0;

  viewService: Microservice | undefined;
  viewServiceTeamMember: Member[] = [];

  routerSub: Subscription | undefined;
  serviceSub: Subscription | undefined;
  routerSysSub: Subscription | undefined;
  teamSub: Subscription | undefined;
  updateSub: Subscription | undefined;

  constructor(private microserviceService: MicroserviceService,
              private teamService: TeamService,
              private memberService: MemberService,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.routerSysSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.sysId = parseInt(<string>params.get('sysId'));
    });

    this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
      var id: number = parseInt(<string>params.get('id'))
      this.serviceSub = this.microserviceService.getMicroservice(id).subscribe(
          (microservice) => {
            this.viewService = microservice;
            //TODO
            //all others things that should happen when a service is found to display
            //e.g. get all team members, download serviceartifacts, etc.
            //this.populateServiceTeam();
          }
      )
    });
  }

  ngOnDestroy(): void {
    this.routerSysSub?.unsubscribe();
    this.routerSub?.unsubscribe();
    this.updateSub?.unsubscribe();
    this.teamSub?.unsubscribe();
  }

}
