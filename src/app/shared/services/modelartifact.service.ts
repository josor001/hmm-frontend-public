import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelArtifact } from '../models/modelartifact.model';

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
  }

  /** GET all ModelArtifacts */
  getModelArtifacts(): Observable<ModelArtifact[]> {
    return this.http.get<ModelArtifact[]>(this.entityUrl)
  }

  /** POST a new ModelArtifact */  
  createModelArtifact(name: string): Observable<ModelArtifact> {
    return this.http.post<ModelArtifact>(this.entityUrl, name, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** PUT a ModelArtifact to be updated */  
  updateModelArtifact(artifact: ModelArtifact): Observable<ModelArtifact> {
    return this.http.put<ModelArtifact>(this.entityUrl, artifact, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** DELETE a ModelArtifact */
  deleteModelArtifact(id: number): Observable<unknown> {
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