import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Team} from "../shared/models/team.model";
import {TeamService} from "../shared/services/team.service";
import {MemberService} from "../shared/services/member.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CompleteTeam} from "../shared/models/completeteam.model";
import {Microservice} from "../shared/models/microservice.model";
import {Member} from "../shared/models/member.model";
import {MicroserviceService} from "../shared/services/microservice.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy {
    sysId: number = 0;

    subGet: Subscription | undefined;
    activeRouterSub: Subscription | undefined;
    routerSub: Subscription | undefined;
    // Declaration of teams Array
    teams: Team[] = [];
    completeTeams: CompleteTeam[] = [];

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

    constructor(private breakpointObserver: BreakpointObserver,
                private teamService: TeamService,
                private memberService: MemberService,
                private microserviceService: MicroserviceService,
                private activatedRoute:ActivatedRoute,
                private snackBar: MatSnackBar) {
    }

    getTeams(): void {
        this.subGet = this.teamService.getTeams(this.sysId).subscribe(teams => {
            this.teams = teams
            this.buildCompleteTeams();
        });
    }

    ngOnDestroy(): void {
        this.subGet?.unsubscribe();
        this.activeRouterSub?.unsubscribe();
    }
    ngOnInit(): void {
        this.activeRouterSub = this.activatedRoute.paramMap.subscribe((params) => {
            this.sysId = parseInt(<string>params.get('sysId'));
        });

        this.getTeams();
    }

    private buildCompleteTeams() {
        this.completeTeams = [];
        this.teams.forEach(team => {
            if(team.name && team.id && team.sysId) {
                console.log("is the error happening here?")
                let compTeam = new CompleteTeam(team.name, team.id, team.sysId);
                compTeam.ownedMicroservices = this.getMicroservices(team);
                compTeam.members = (this.getMembers(team));
                this.completeTeams.push(compTeam);
            }
        })
    }

    private getMicroservices(team: Team) : Microservice[] {
        if(!team.ownedMicroserviceIds)
            return [];
        let microservices : Microservice[] = [];
        team.ownedMicroserviceIds.forEach(id => {
            this.microserviceService.getMicroservice(id).subscribe(value => {
                //only add to array if the microservice was actually found and is not undefined
                if(value)
                    microservices.push(value);
            })
        })

        return microservices;
    }

    private getMembers(team: Team) : Member[] {
        if(!team.memberIds)
            return []
        let members : Member[] = []
        team.memberIds.forEach(id => {
            this.memberService.getMember(id).subscribe(value => {
                members.push(value);
            })
        })
        return members;
    }

    deleteTeam(id: number) {
        this.teamService.deleteTeam(id).subscribe(
            value => {
                this.openSnackBar("Team deleted.", "SUCCESS");
                this.getTeams();
            }
        )
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}