import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Microservice } from '../models/microservice.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MicroserviceService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/microservices';

  constructor(private http: HttpClient) { }

  /** GET a specific microservice by its ID */
  getMicroservice(id: number): Observable<Microservice> {
    return this.http.get<Microservice>(this.entityUrl+'/'+id)
  }

  /** GET all microservices */
  getMicroservices(): Observable<Microservice[]> {
    return this.http.get<Microservice[]>(this.entityUrl)
  }

  /** POST a new microservice */  
  createMicroservice(name: string): Observable<Microservice> {
    return this.http.post<Microservice>(this.entityUrl, name, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** PUT a microservice to be updated */  
  updateMicroservice(microservice: Microservice): Observable<Microservice> {
    return this.http.put<Microservice>(this.entityUrl, microservice, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** PUT a new artifact into a microservice */  
  addModelArtifact(serviceId: number, artifactId: number): Observable<Microservice> {
    const url = `${this.entityUrl}/${serviceId}/artifacts`;    
    return this.http.put<Microservice>(url, artifactId, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** DELETE an artifact from a microservice */
  removeModelArtifact(serviceId: number, artifactId: number): Observable<unknown> {
    const url = `${this.entityUrl}/${serviceId}/artifacts/${artifactId}`;
    return this.http.delete(url, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** DELETE a microservice */
  deleteMicroservice(id: number): Observable<unknown> {
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