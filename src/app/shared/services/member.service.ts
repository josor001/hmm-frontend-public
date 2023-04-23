import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Member} from '../models/member.model';
import {MEMBERS} from "../../../assets/mock-data/mock-members";
import Utils from "./Utils";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //Authorization: 'my-auth-token'
    })
};

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    // URL to web api
    private entityUrl = environment.serverUrl + '/members';

    constructor(private http: HttpClient) {
    }

    /** GET a specific member by its ID */
    getMember(id: number): Observable<Member> {
        if (environment.useMockData) {
            let found = of(MEMBERS.find(member => member.id == id))
            if (found !== undefined) {
                return <Observable<Member>>found;
            } else {
                return of({})
            }
        } else {
            return this.http.get<Member>(this.entityUrl + '/' + id).pipe(catchError(Utils.handleError));
        }
    }

    /** GET all members */
    getMembers(sysId : number): Observable<Member[]> {
        if (environment.useMockData) {
            return of(MEMBERS);
        } else {
            return this.http.get<Member[]>(this.entityUrl, {params:{sysId:sysId}})
                .pipe(catchError(Utils.handleError));
        }
    }

    /** POST a new member */
    createMember(firstname: string, lastname: string, email: string, sysId: number): Observable<Member> {
        var memberDto = {firstname, lastname, email, sysId}
        if (environment.useMockData) {
            return of(<Member>{
                firstname: firstname,
                lastname: lastname,
                email: email,
                profileLink: '',
                expertise: '',
                sysId: 1,
                id: 1001,
            });
        } else {
            return this.http.post<Member>(this.entityUrl, memberDto, httpOptions)
                .pipe(catchError(Utils.handleError));
        }
    }

    /** PUT a member to be updated */
    updateMember(member: Member): Observable<Member> {
        if (environment.useMockData) {
            let found = of(MEMBERS.find(oldMember => oldMember.id == member.id))
            if (found !== undefined) {
                return <Observable<Member>>found;
            } else {
                return of({})
            }
        } else {
            return this.http.put<Member>(this.entityUrl, member, httpOptions)
                .pipe(catchError(Utils.handleError));
        }
    }

    /** DELETE a member */
    deleteMember(id: number): Observable<unknown> {
        const url = `${this.entityUrl}/${id}`;

        if (environment.useMockData) {
            console.log("nothing to delete in mock data mode.")
            return of(true);
        } else {
            return this.http.delete(url, httpOptions)
                .pipe(catchError(Utils.handleError));
        }
    }
}