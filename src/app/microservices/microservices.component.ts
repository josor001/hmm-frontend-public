import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from "../shared/services/member.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MicroserviceService} from "../shared/services/microservice.service";
import {Microservice} from "../shared/models/microservice.model";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {TeamService} from "../shared/services/team.service";
import {Member} from "../shared/models/member.model";
import {Team} from "../shared/models/team.model";

@Component({
  selector: 'app-microservices',
  templateUrl: './microservices.component.html',
  styleUrls: ['./microservices.component.scss']
})
export class MicroservicesComponent implements OnInit, OnDestroy {
  subGet: any;
  microservices: Microservice[] = [];
  microserviceTeams = new Map<number, Team>();
  microserviceSpocs = new Map<number, Member>();

  // set number of columns based on screen size
  cols$: Observable<number> = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Medium])
      .pipe(
          map((result) => {
              if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
                  return 1;
              } else if (result.breakpoints[Breakpoints.Medium]) {
                  return 2;
            } else {
              return 3;
            }
          }),
          shareReplay()
      );

  constructor(private microserviceService: MicroserviceService,
              private teamService:TeamService,
              private memberService:MemberService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar) { }



  getMicroservices(): void {
    this.subGet = this.microserviceService.getMicroservices().subscribe(services => this.microservices = services);
  }

  prepareTeamNamesForServices(): void {
      this.microservices.forEach(
          service => {
              if(service.id) {
                  this.teamService.getTeamByMicroserviceId(service.id).subscribe(
                      team => this.microserviceTeams.set(service.id!, team))
              }
          }
      )
  }

  prepareSpocsForServices(): void {
      this.microservices.forEach(
          service => {
              if(service.id && service.contactPersonId) {
                  this.memberService.getMember(service.contactPersonId).subscribe(
                      spoc => this.microserviceSpocs.set(service.id!, spoc))
              }
          }
      )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  deleteMicroservice(id: number) {
    this.microserviceService.deleteMicroservice(id).subscribe(
        value => {
          this.openSnackBar("Microservice deleted.", "SUCCESS");
        }
    )
  }

  ngOnInit(): void {
    this.getMicroservices();
    this.prepareTeamNamesForServices();
    this.prepareSpocsForServices();
  }

  ngOnDestroy(): void {
    this.subGet.unsubscribe();
  }

}
