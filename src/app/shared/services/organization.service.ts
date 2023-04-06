import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../models/organization.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/organizations';

  constructor(private http: HttpClient) { }

  /** GET a specific Organization by its ID */
  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(this.entityUrl+'/'+id)
  }

  /** GET all Organizations */
  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.entityUrl)
  }

  /** POST a new Organization */  
  createOrganization(name: string): Observable<Organization> {
    return this.http.post<Organization>(this.entityUrl, name, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** PUT a Organization to be updated */  
  updateOrganization(orga: Organization): Observable<Organization> {
    return this.http.put<Organization>(this.entityUrl, orga, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** PUT a new Team in an Organization */  
  addTeam(orgaId: number, teamId: number): Observable<Organization> {
    const url = `${this.entityUrl}/${orgaId}/teams`;    
    return this.http.put<Organization>(url, teamId, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** DELETE a Team from an Organization */
  removeTeam(orgaId: number, teamId: number): Observable<unknown> {
    const url = `${this.entityUrl}/${orgaId}/teams/${teamId}`;
    return this.http.delete(url, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** DELETE an Organization */
  deleteOrganization(id: number): Observable<unknown> {
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