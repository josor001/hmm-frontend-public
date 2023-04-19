import { Injectable } from '@angular/core';
import Utils from "./Utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {ServiceStoryEdge} from "../models/servicestoryedge.model";
import {STORIES} from "../../../assets/mock-data/mock-stories";
import {ServiceStory} from "../models/servicestory.model";
import {STORIES_EDGES} from "../../../assets/mock-data/mock-stories-edges";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ServiceStoryEdgeService {
  // URL to web api
  private entityUrl = environment.serverUrl+"/stories/edges";

  /** GET a specific ServiceStoryEdge by its ID */
  getServiceStoryEdge(id: number): Observable<ServiceStoryEdge> {
    return this.http.get<ServiceStoryEdge>(this.entityUrl+'/'+id)
        .pipe(catchError(Utils.handleError));
  }

  /** GET all ServiceStoryEdges */
  getServiceStoryEdges(): Observable<ServiceStoryEdge[]> {
    if (environment.useMockData) {
      return of(STORIES_EDGES);
    } else {
      return this.http.get<ServiceStoryEdge[]>(this.entityUrl)
          .pipe(catchError(Utils.handleError));
    }

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