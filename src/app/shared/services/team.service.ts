import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Team} from "../models/team.model";
import {TEAMS} from "../../../assets/mock-data/mock-teams";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Microservice} from "../models/microservice.model";
import Utils from "./Utils";
import {MEMBERS} from "../../../assets/mock-data/mock-members";
import {Member} from "../models/member.model";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //Authorization: 'my-auth-token'
    })
};

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    // URL to web api
    private entityUrl = environment.serverUrl + '/teams';

    /** GET a specific Team by its ID */
    getTeam(id: number): Observable<Team> {
        if (environment.useMockData) {
            let found = of(TEAMS.find(team => team.id == id))
            if (found !== undefined) {
                return <Observable<Team>>found;
            } else {
                return of({})
            }
        } else {
            return this.http.get<Team>(this.entityUrl + '/' + id);
        }
    }

    /** GET a specific Team by the Id of the owned microservice. */
    getTeamByMicroserviceId(serviceId: number): Observable<Team> {
        if (environment.useMockData) {
            let found = of(TEAMS.find(team => team.ownedMicroserviceIds?.includes(serviceId)))
            if (found !== undefined) {
                return <Observable<Team>>found;
            } else {
                return of({})
            }
        } else {
            return this.http.get<Team>(this.entityUrl + '/microservice/' + serviceId)
                .pipe(catchError(Utils.handleError));
        }
    }

    /** GET a specific Team by the Id of one of its Members. */
    getTeamByMemberId(serviceId: number): Observable<Team> {
        if (environment.useMockData) {
            let found = of(TEAMS.find(team => team.memberIds?.includes(serviceId)))
            if (found !== undefined) {
                return <Observable<Team>>found;
            } else {
                return of({})
            }
        } else {
            return this.http.get<Team>(this.entityUrl + '/member/' + serviceId)
                .pipe(catchError(Utils.handleError));
        }
    }



    /** GET all Teams */
    getTeams(sysId : number): Observable<Team[]> {
        if (environment.useMockData) {
            return of(TEAMS);
        } else {
            return this.http.get<Team[]>(this.entityUrl, {params:{sysId:sysId}})
                .pipe(catchError(Utils.handleError));
        }
    }

    /** POST a new Team */
    createTeam(name: string, sysId: number): Observable<Team> {
        var teamDto = {name, sysId}
        if (environment.useMockData) {
            return of(<Team>{name: "TestTeam", sysId: 1});
        } else {
            return this.http.post<Team>(this.entityUrl, teamDto, httpOptions)
                .pipe(catchError(Utils.handleError));
        }
    }

    /** PUT a Team to be updated */
    updateTeam(team: Team): Observable<Team> {
        if (environment.useMockData) {
            let found = of(TEAMS.find(oldTeam => oldTeam.id == team.id))
            if (found !== undefined) {
                return <Observable<Team>>found;
            } else {
                return of({})
            }
        } else {
            return this.http.put<Team>(this.entityUrl, team, httpOptions)
                .pipe(catchError(Utils.handleErrorTeamUpdate));
        }
    }


    /** PUT a new microservice into a team */
    addMicroservice(teamId: number, microserviceId: number): Observable<Team> {
        const url = `${this.entityUrl}/${teamId}/microservices`;
        return this.http.put<Microservice>(url, microserviceId, httpOptions)
            .pipe(catchError(Utils.handleError));
    }

    /** DELETE a microservice from a team */
    removeMicroservice(teamId: number, serviceId: number): Observable<unknown> {
        const url = `${this.entityUrl}/${teamId}/microservices/${serviceId}`;
        return this.http.delete(url, httpOptions)
            .pipe(catchError(Utils.handleError));
    }

    /** PUT a new member into a team */
    addMember(teamId: number, memberId: number): Observable<Team> {
        const url = `${this.entityUrl}/${teamId}/members`;
        return this.http.put<Microservice>(url, memberId, httpOptions)
            .pipe(catchError(Utils.handleError));
    }

    /** DELETE a member from a team */
    removeMember(teamId: number, memberId: number): Observable<unknown> {
        const url = `${this.entityUrl}/${teamId}/members/${memberId}`;
        return this.http.delete(url, httpOptions)
            .pipe(catchError(Utils.handleError));
    }

    /** DELETE a Team */
    deleteTeam(id: number): Observable<unknown> {
        const url = `${this.entityUrl}/${id}`;

        if (environment.useMockData) {
            console.log("nothing to delete in mock data mode.")
            return of(true);
        } else {
            return this.http.delete(url, httpOptions)
                .pipe(catchError(Utils.handleError));
        }

    }


    constructor(private http: HttpClient) {
    }
}
