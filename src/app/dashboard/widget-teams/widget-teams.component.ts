import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TeamService} from "../../shared/services/team.service";

@Component({
  selector: 'app-widget-teams',
  templateUrl: './widget-teams.component.html',
  styleUrls: ['./widget-teams.component.scss']
})
export class WidgetTeamsComponent implements OnInit, OnDestroy {
  numberOfTeams: number = 0;
  sub: Subscription | undefined;
  @Input() sysId: number = 0;
  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.sub = this.teamService.getTeams(this.sysId).subscribe(teams => {
      this.numberOfTeams = teams.length
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}
