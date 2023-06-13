import { Injectable } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { environment } from '../../../environments/environment';
import {SYSTEMS} from "../../../assets/mock-data/mock-softwaresystems";
import {Softwaresystem} from "../models/softwaresystem.model";
import {Member} from "../models/member.model";
import {MEMBERS} from "../../../assets/mock-data/mock-members";
import Utils from "./Utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SoftwaresystemService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/systems';
  constructor(private http: HttpClient) { }

  /** GET a specific system by its ID */
  getSoftwaresystem(id: number): Observable<Softwaresystem> {
    if (environment.useMockData) {
      let found = of(SYSTEMS.find(system => system.id == id))
      if (found !== undefined) {
        return <Observable<Softwaresystem>>found;
      } else {
        return of({})
      }
    } else {
      return this.http.get<Softwaresystem>(this.entityUrl + '/' + id).pipe(catchError(Utils.handleError));
    }
  }

  /** GET all systems */
  getSoftwaresystems(): Observable<Softwaresystem[]> {
    if (environment.useMockData) {
      return of(SYSTEMS);
    } else {
      return this.http.get<Softwaresystem[]>(this.entityUrl)
          .pipe(catchError(Utils.handleError));
    }
  }

  /** POST a new system */
  createSoftwaresystem(name: string, description: string): Observable<Softwaresystem> {
    var systemDto = {name, description}
    if (environment.useMockData) {
      return of(<Softwaresystem>{
        name: name,
        description: description,
        id: 1001
      });
    } else {
      return this.http.post<Softwaresystem>(this.entityUrl, systemDto, httpOptions)
          .pipe(catchError(Utils.handleError));
    }
  }

  /** PUT a system to be updated */
  updateSoftwaresystem(system: Softwaresystem): Observable<Softwaresystem> {
    if (environment.useMockData) {
      let found = of(SYSTEMS.find(oldSystem => oldSystem.id == system.id))
      if (found !== undefined) {
        return <Observable<Softwaresystem>>found;
      } else {
        return of({})
      }
    } else {
      return this.http.put<Softwaresystem>(this.entityUrl, system, httpOptions)
          .pipe(catchError(Utils.handleError));
    }
  }

  /** DELETE a system */
  deleteSoftwaresystem(id: number): Observable<unknown> {
    const url = `${this.entityUrl}/${id}`;

    if (environment.useMockData) {
      console.log("nothing to delete in mock data mode.")
      return of(true);
    } else {
      return this.http.delete(url, httpOptions)
          .pipe(catchError(Utils.handleError));
    }
  }
}
