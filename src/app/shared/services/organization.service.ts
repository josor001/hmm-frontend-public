import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../models/organization.model';
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
export class OrganizationService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/organizations';

  constructor(private http: HttpClient) { }

  /** GET a specific Organization by its ID */
  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(this.entityUrl+'/'+id)
        .pipe(catchError(Utils.handleError));
  }

  /** GET all Organizations */
  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.entityUrl)
        .pipe(catchError(Utils.handleError));
  }

  /** POST a new Organization */  
  createOrganization(name: string): Observable<Organization> {
    return this.http.post<Organization>(this.entityUrl, name, httpOptions)
     .pipe(catchError(Utils.handleError));
  }

  /** PUT a Organization to be updated */  
  updateOrganization(orga: Organization): Observable<Organization> {
    return this.http.put<Organization>(this.entityUrl, orga, httpOptions)
     .pipe(catchError(Utils.handleError));
  }

  /** PUT a new Team in an Organization */  
  addTeam(orgaId: number, teamId: number): Observable<Organization> {
    const url = `${this.entityUrl}/${orgaId}/teams`;    
    return this.http.put<Organization>(url, teamId, httpOptions)
     .pipe(catchError(Utils.handleError));
  }

  /** DELETE a Team from an Organization */
  removeTeam(orgaId: number, teamId: number): Observable<unknown> {
    const url = `${this.entityUrl}/${orgaId}/teams/${teamId}`;
    return this.http.delete(url, httpOptions)
     .pipe(catchError(Utils.handleError));
  }

  /** DELETE an Organization */
  deleteOrganization(id: number): Observable<unknown> {
    const url = `${this.entityUrl}/${id}`;
    return this.http.delete(url, httpOptions)
     .pipe(catchError(Utils.handleError));
  }
}