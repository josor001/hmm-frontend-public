import { Injectable } from '@angular/core';
import Utils from "./Utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {ServiceStoryEdge} from "../models/servicestoryedge.model";
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

  mockIdCounter = 100;
  /** GET a specific ServiceStoryEdge by its ID */
  getServiceStoryEdge(id: number): Observable<ServiceStoryEdge> {
    if (environment.useMockData) {
      let found = of(STORIES_EDGES.find(story => story.id == id))
      if (found !== undefined) {
        return <Observable<ServiceStoryEdge>>found;
      } else {
        return of({})
      }
    } else {
      return this.http.get<ServiceStoryEdge>(this.entityUrl+'/'+id)
          .pipe(catchError(Utils.handleError));
    }
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
  createServiceStoryEdge(sourceId: number, targetId: number, description: string): Observable<ServiceStoryEdge> {
    var edgeDto = {sourceId, targetId, description}
    if (environment.useMockData) {
      return of(<ServiceStoryEdge>{
        sourceId: sourceId,
        targetId: targetId,
        desc: description,
        id: this.mockIdCounter++,
      });
    } else {
      return this.http.post<ServiceStoryEdge>(this.entityUrl, edgeDto, httpOptions)
          .pipe(catchError(Utils.handleError));
    }




  }

  /** PUT a ServiceStoryEdge to be updated */
  updateServiceStoryEdge(storyEdge: ServiceStoryEdge): Observable<ServiceStoryEdge> {
    if (environment.useMockData) {
      let found = of(STORIES_EDGES.find(oldEdge => oldEdge.id == storyEdge.id))
      if (found !== undefined) {
        return <Observable<ServiceStoryEdge>>found;
      } else {
        return of({})
      }
    } else {
      return this.http.put<ServiceStoryEdge>(this.entityUrl, storyEdge, httpOptions)
          .pipe(catchError(Utils.handleError));
    }
  }

  /** DELETE a ServiceStoryEdge */
  deleteServiceStoryEdge(id: number): Observable<unknown> {
    const url = `${this.entityUrl}/${id}`;
    return this.http.delete(url, httpOptions)
        .pipe(catchError(Utils.handleError));
  }

  constructor(private http: HttpClient) { }
}