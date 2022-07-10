import { Component, OnInit } from '@angular/core';
import { Organization } from '../shared/models/organization.model';
import { Team } from '../shared/models/team.model';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

  orga: Organization = {
    id: 1,
    name: 'Lakeside Mutual',
    teams: new Set<Team>()
  };

  constructor() { }

  ngOnInit(): void {
    this.orga.teams?.add({id: 1, name: "a rng team", organization: this.orga})
    this.orga.teams?.add({id: 2, name: "another rng team", organization: this.orga})
  }

}
