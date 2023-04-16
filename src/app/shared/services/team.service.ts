import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Team} from "../models/team.model";
import {TEAMS} from "../../../assets/mock-data/mock-teams";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/teams';

  /** GET all Teams */
  getTeams(): Observable<Team[]> {
    if (environment.useMockData) {
      return of(TEAMS);
    } else {
      throw new Error('Method not implemented.');
    }
  }
  constructor() { }
}
