import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {SYSTEMS} from "../../../assets/mock-data/mock-softwaresystems";
import {Softwaresystem} from "../models/softwaresystem.model";

@Injectable({
  providedIn: 'root'
})
export class SoftwaresystemService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/systems';

  /** GET all Systems */
  getSoftwaresystems(): Observable<Softwaresystem[]> {
    if (environment.useMockData) {
      return of(SYSTEMS);
    } else {
      throw new Error('Method not implemented.');
    }
  }
  constructor() { }
}
