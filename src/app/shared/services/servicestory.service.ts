import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceStory } from '../models/servicestory.model';
import Utils from "./Utils";
import {MICROSERVICES} from "../../../assets/mock-data/mock-microservices";
import {Microservice} from "../models/microservice.model";
import {STORIES} from "../../../assets/mock-data/mock-stories";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceStoryService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/stories';

  constructor(private http: HttpClient) { }

  /** GET a specific ServiceStory by its ID */
  getServiceStory(id: number): Observable<ServiceStory> {
    return this.http.get<ServiceStory>(this.entityUrl+'/'+id)
        .pipe(catchError(Utils.handleError));
  }

  /** GET all ServiceStorys */
  getServiceStories(): Observable<ServiceStory[]> {
    if (environment.useMockData) {
      return of(STORIES);
    } else {
      return this.http.get<ServiceStory[]>(this.entityUrl)
          .pipe(catchError(Utils.handleError));
    }
  }

  /** POST a new ServiceStory */  
  createServiceStory(name: string): Observable<ServiceStory> {
    return this.http.post<ServiceStory>(this.entityUrl, name, httpOptions)
     .pipe(catchError(Utils.handleError));
  }

  /** PUT a ServiceStory to be updated */  
  updateServiceStory(story: ServiceStory): Observable<ServiceStory> {
    return this.http.put<ServiceStory>(this.entityUrl, story, httpOptions)
     .pipe(catchError(Utils.handleError));
  }

  /** PUT a new Vertex in a ServiceStory */  
  addVertex(storyId: number, vertexId: number): Observable<ServiceStory> {
    const url = `${this.entityUrl}/${storyId}/vertices`;    
    return this.http.put<ServiceStory>(url, vertexId, httpOptions)
     .pipe(catchError(Utils.handleError));
  }

  /** DELETE a Vertex from a ServiceStory */
  removeVertex(storyId: number, vertexId: number): Observable<unknown> {
    const url = `${this.entityUrl}/${storyId}/vertices/${vertexId}`;
    return this.http.delete(url, httpOptions)
     .pipe(catchError(Utils.handleError));
  }

    /** PUT a new Edge in a ServiceStory */  
    addEdge(storyId: number, edgeId: number): Observable<ServiceStory> {
      const url = `${this.entityUrl}/${storyId}/edges`;    
      return this.http.put<ServiceStory>(url, edgeId, httpOptions)
       .pipe(catchError(Utils.handleError));
    }
  
    /** DELETE an Edge from a ServiceStory */
    removeEdge(storyId: number, edgeId: number): Observable<unknown> {
      const url = `${this.entityUrl}/${storyId}/edges/${edgeId}`;
      return this.http.delete(url, httpOptions)
       .pipe(catchError(Utils.handleError));
    }

  /** DELETE a ServiceStory */
  deleteServiceStory(id: number): Observable<unknown> {
    const url = `${this.entityUrl}/${id}`;
    return this.http.delete(url, httpOptions)
     .pipe(catchError(Utils.handleError));
  }
}