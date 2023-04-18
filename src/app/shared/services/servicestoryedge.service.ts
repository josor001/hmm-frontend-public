import { Injectable } from '@angular/core';
import Utils from "./Utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {ServiceStoryEdge} from "../models/servicestoryedge.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ServicestoryedgeService {
  // URL to web api
  private entityUrl = environment.serverUrl+"/stories/edges";

  /** GET a specific ServiceStoryEdge by its ID */
  getServiceStoryEdge(id: number): Observable<ServiceStoryEdge> {
    return this.http.get<ServiceStoryEdge>(this.entityUrl+'/'+id)
        .pipe(catchError(Utils.handleError));
  }

  /** GET all ServiceStoryEdges */
  getServiceStoryEdges(): Observable<ServiceStoryEdge[]> {
    return this.http.get<ServiceStoryEdge[]>(this.entityUrl)
        .pipe(catchError(Utils.handleError));
  }

  /** POST a new ServiceStoryEdge */
  createServiceStoryEdge(sourceId: number, targetId: number): Observable<ServiceStoryEdge> {
    var edgeDto = {sourceId, targetId}
    return this.http.post<ServiceStoryEdge>(this.entityUrl, edgeDto, httpOptions)
        .pipe(catchError(Utils.handleError));
  }

  /** PUT a ServiceStoryEdge to be updated */
  updateServiceStoryEdge(storyEdge: ServiceStoryEdge): Observable<ServiceStoryEdge> {
    return this.http.put<ServiceStoryEdge>(this.entityUrl, storyEdge, httpOptions)
        .pipe(catchError(Utils.handleError));
  }

  /** DELETE a ServiceStoryEdge */
  deleteServiceStoryEdge(id: number): Observable<unknown> {
    const url = `${this.entityUrl}/${id}`;
    return this.http.delete(url, httpOptions)
        .pipe(catchError(Utils.handleError));
  }

  constructor(private http: HttpClient) { }
}