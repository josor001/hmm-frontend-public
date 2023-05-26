import {Component, OnDestroy, OnInit} from '@angular/core';
import {Microservice} from "../../shared/models/microservice.model";
import {Member} from "../../shared/models/member.model";
import {Subscription} from "rxjs";
import {MicroserviceService} from "../../shared/services/microservice.service";
import {TeamService} from "../../shared/services/team.service";
import {MemberService} from "../../shared/services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HighlightAutoResult, HighlightLoader} from "ngx-highlightjs";

//const themeGithub: string = '../node_modules/highlight.js/styles/github.css';
//const themeGithubDark: string = 'node_modules/highlight.js/styles/github-dark.css';

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
  //TODO just a test
  //currentTheme: string = themeGithub;

  response: HighlightAutoResult | undefined;

  typescript = `function myFunction() {
    document.getElementById("demo1").innerHTML = "Test 1!";
    document.getElementById("demo2").innerHTML = "Test 2!";
  }`;

  lemma = `context Delivery {
    structure Courier<aggregate, entity> {
        long id<identifier>,
        Plan plan<part>,
        boolean available,
        function ActionList actionsForDelivery(long deliveryId),
        procedure noteAvailable(),
        procedure addAction(Action action),
        procedure cancelDelivery(long deliveryId),
        function Courier create(long courierId)  //STATIC
    }

    structure Action<valueObject> {
      immutable DeliveryAPI::Web.DeliveryActionType type,
      immutable Common::Common.Address address,
      immutable date time,
      immutable long deliveryId,
      function boolean actionFor(long deliveryId)<sideEffectFree>,
      function Action makePickup(long deliveryId, Common::Common.Address pickupAddress, date pickupTime)<sideEffectFree>,
      function Action makeDropoff(long deliveryId, Common::Common.Address deliveryAddress, date deliveryTime)<sideEffectFree>
    }

    collection ActionList {Action action}
    }`;

  constructor(private microserviceService: MicroserviceService,
              private teamService: TeamService,
              private memberService: MemberService,
              private activatedRoute: ActivatedRoute,
              private hljsLoader: HighlightLoader) {
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

  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }

  //changeTheme() {
  //  this.currentTheme = this.currentTheme === themeGithub ? themeGithubDark : themeGithub;
  //  this.hljsLoader.setTheme(this.currentTheme);
  //}

}
