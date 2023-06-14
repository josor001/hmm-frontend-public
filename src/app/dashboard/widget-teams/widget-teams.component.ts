import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TeamService} from "../../shared/services/team.service";
import {Team} from "../../shared/models/team.model";

@Component({
  selector: 'app-widget-teams',
  templateUrl: './widget-teams.component.html',
  styleUrls: ['./widget-teams.component.scss']
})
export class WidgetTeamsComponent implements OnInit, OnDestroy {
  numberOfTeams: number = 0;
  teams: Team[] = [];
  sub: Subscription | undefined;
  @Input() sysId: number = 0;
  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.sub = this.teamService.getTeams(this.sysId).subscribe(teams => {
      this.numberOfTeams = teams.length;
      this.teams = teams;
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}
