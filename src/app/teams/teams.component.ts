import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Team} from "../shared/models/team.model";
import {TeamService} from "../shared/services/team.service";
import {MemberService} from "../shared/services/member.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CompleteTeam} from "../shared/models/completeTeam.model";
import {Microservice} from "../shared/models/microservice.model";
import {Member} from "../shared/models/member.model";
import {newArray} from "@angular/compiler/src/util";
import {MicroserviceService} from "../shared/services/microservice.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

    subGet: any;
    subCompGet: any;
    // Declaration of teams Array
    teams: Team[] = [];
    completeTeams: CompleteTeam[] = [];

    // set number of columns based on screen size
    cols$: Observable<number> = this.breakpointObserver
        .observe([Breakpoints.Small, Breakpoints.XSmall])
        .pipe(
            map((result) => {
                if (result.breakpoints[Breakpoints.XSmall]) {
                    return 1;
                } else if (result.breakpoints[Breakpoints.Small]) {
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
                private snackBar: MatSnackBar) {
    }

    getTeams(): void {
        this.subGet = this.teamService.getTeams().subscribe(teams => this.teams = teams);
    }

    ngOnDestroy(): void {
        this.subGet.unsubscribe();
    }
    ngOnInit(): void {
        this.getTeams();
        this.buildCompleteTeams();
    }

    private buildCompleteTeams() {
        this.teams.forEach(team => {
            if(team.name && team.id) {
                let compTeam = new CompleteTeam(team.name, team.id);
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
            }
        )
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}