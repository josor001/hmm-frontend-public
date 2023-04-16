import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Team} from "../shared/models/team.model";
import {TeamService} from "../shared/services/team.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
    // Declaration of teams Array
    teams: Team[] = [];

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

    constructor(private breakpointObserver: BreakpointObserver, private teamService: TeamService) {
    }

    getTeams(): void {
        this.teamService.getTeams().subscribe(teams => this.teams = teams);
    }

    ngOnInit(): void {
        this.getTeams();
    }

}