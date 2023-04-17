import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelArtifact } from '../models/modelartifact.model';
import Utils from "./Utils";

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
  getModelArtifacts(): Observable<ModelArtifact[]> {
    return this.http.get<ModelArtifact[]>(this.entityUrl)
        .pipe(catchError(Utils.handleError));
  }

  /** POST a new ModelArtifact */  
  createModelArtifact(name: string): Observable<ModelArtifact> {
    return this.http.post<ModelArtifact>(this.entityUrl, name, httpOptions)
     .pipe(catchError(Utils.handleError));
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