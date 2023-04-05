import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/members';

  constructor(private http: HttpClient) { }

  /** GET a specific member by its ID */
  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(this.entityUrl+'/'+id)
  }

  /** GET all members */
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.entityUrl)
  }

  /** POST a new member */  
  createMember(firstname: string, lastname: string, email: string): Observable<Member> {
    var memberDto = {firstname, lastname, email}
    return this.http.post<Member>(this.entityUrl, memberDto, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** PUT a member to be updated */  
  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(this.entityUrl, member, httpOptions)
     .pipe(catchError(this.handleError));
  }

  /** DELETE a member */
  deleteHero(id: number): Observable<unknown> {
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