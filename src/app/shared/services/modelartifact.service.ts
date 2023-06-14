import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelArtifact } from '../models/modelartifact.model';
import Utils from "./Utils";
import {Member} from "../models/member.model";
import {Microservice} from "../models/microservice.model";
import {MICROSERVICES} from "../../../assets/mock-data/mock-microservices";
import {Team} from "../models/team.model";
import {TEAMS} from "../../../assets/mock-data/mock-teams";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ModelArtifactService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/artifacts';

  constructor(private http: HttpClient) { }

  /** GET a specific ModelArtifact by its ID */
  getModelArtifact(id: number): Observable<ModelArtifact> {
    return this.http.get<ModelArtifact>(this.entityUrl+'/'+id)
        .pipe(catchError(Utils.handleError));
  }

  /** GET all ModelArtifacts */
  getModelArtifacts(sysId : number): Observable<ModelArtifact[]> {
    if (environment.useMockData) {
      return of([]);
    } else {
      return this.http.get<ModelArtifact[]>(this.entityUrl, {params:{sysId:sysId}})
          .pipe(catchError(Utils.handleError));
    }
  }

  /** GET all ModelArtifacts by the id of the assigned microservice. */
  getModelArtifactsByMicroserviceId(serviceId: number): Observable<ModelArtifact[]> {
    if (environment.useMockData) {
        return of([])
    } else {
      return this.http.get<ModelArtifact[]>(this.entityUrl + '/microservice/' + serviceId)
          .pipe(catchError(Utils.handleError));
    }
  }

  /** POST a new ModelArtifact */  
  createModelArtifact(name: string, kind: string, location: string, microserviceId: number, sysId: number): Observable<ModelArtifact> {
    var artifactDto = {name, kind, location, microserviceId, sysId}
    if (environment.useMockData) {
      return of(<ModelArtifact>{
        name: name,
        kind: kind,
        location: location,
        microserviceId: 1,
        sysId: 1,
        id: 1001,
      });
    } else {
      return this.http.post<ModelArtifact>(this.entityUrl, artifactDto, httpOptions)
          .pipe(catchError(Utils.handleError));
    }
  }

  /** PUT a ModelArtifact to be updated */  
  updateModelArtifact(artifact: ModelArtifact): Observable<ModelArtifact> {
    return this.http.put<ModelArtifact>(this.entityUrl, artifact, httpOptions)
     .pipe(catchError(Utils.handleError));
  }

  /** DELETE a ModelArtifact */
  deleteModelArtifact(id: number): Observable<unknown> {
    const url = `${this.entityUrl}/${id}`;
    return this.http.delete(url, httpOptions)
     .pipe(catchError(Utils.handleError));
  }
}