import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceStory } from '../models/servicestory.model';

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
  getOrganization(id: number): Observable<ServiceStory> {
    return this.http.get<ServiceStory>(this.entityUrl+'/'+id)
  }

  /** GET all ServiceStorys */
  getServiceStories(): Observable<ServiceStory[]> {
    return this.http.get<ServiceStory[]>(this.entityUrl)
  }

  /** POST a new ServiceStory */  
  createServiceStory(name: string): Observable<ServiceStory> {
    return this.http.post<ServiceStory>(this.entityUrl, name, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** PUT a ServiceStory to be updated */  
  updateServiceStory(story: ServiceStory): Observable<ServiceStory> {
    return this.http.put<ServiceStory>(this.entityUrl, story, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** PUT a new Vertex in a ServiceStory */  
  addVertex(storyId: number, vertexId: number): Observable<ServiceStory> {
    const url = `${this.entityUrl}/${storyId}/vertices`;    
    return this.http.put<ServiceStory>(url, vertexId, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** DELETE a Vertex from a ServiceStory */
  removeVertex(storyId: number, vertexId: number): Observable<unknown> {
    const url = `${this.entityUrl}/${storyId}/vertices/${vertexId}`;
    return this.http.delete(url, httpOptions)
     .pipe(catchError(this.handleError));
  }

    /** PUT a new Edge in a ServiceStory */  
    addEdge(storyId: number, edgeId: number): Observable<ServiceStory> {
      const url = `${this.entityUrl}/${storyId}/edges`;    
      return this.http.put<ServiceStory>(url, edgeId, httpOptions)
       .pipe(catchError(this.handleError));
    }
  
    /** DELETE an Edge from a ServiceStory */
    removeEdge(storyId: number, edgeId: number): Observable<unknown> {
      const url = `${this.entityUrl}/${storyId}/edges/${edgeId}`;
      return this.http.delete(url, httpOptions)
       .pipe(catchError(this.handleError));
    }

  /** DELETE a ServiceStory */
  deleteServiceStory(id: number): Observable<unknown> {
    const url = `${this.entityUrl}/${id}`;
    return this.http.delete(url, httpOptions)
     .pipe(catchError(this.handleError));
  }


  /** ERROR HANDLER */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}