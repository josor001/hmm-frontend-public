import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Microservice} from '../models/microservice.model';
import {MICROSERVICES} from "../../../assets/mock-data/mock-microservices";
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
export class MicroserviceService {
    // URL to web api
    private entityUrl = environment.serverUrl + '/microservices';

    constructor(private http: HttpClient) {
    }

    /** GET a specific microservice by its ID */
    getMicroservice(id: number): Observable<Microservice> {
        if (environment.useMockData) {
            let found = of(MICROSERVICES.find(service => service.id == id))
            if (found !== undefined) {
                return <Observable<Microservice>>found;
            } else {
                return of({})
            }
        } else {
            return this.http.get<Microservice>(this.entityUrl + '/' + id)
                .pipe(catchError(Utils.handleError));
        }

    }

    /** GET all microservices */
    getMicroservices(sysId : number): Observable<Microservice[]> {
        if (environment.useMockData) {
            return of(MICROSERVICES);
        } else {
            return this.http.get<Microservice[]>(this.entityUrl, {params:{sysId:sysId}})
                .pipe(catchError(Utils.handleError));
        }
    }

    /** POST a new microservice */
    createMicroservice(name: string, sysId: number): Observable<Microservice> {
        var msDto = {name, sysId}
        if (environment.useMockData) {
            return of(<Microservice>{name: name, id: 1001, sysId: 1});
        } else {
            return this.http.post<Microservice>(this.entityUrl, msDto, httpOptions)
                .pipe(catchError(Utils.handleError));
        }
    }

    /** PUT a microservice to be updated */
    updateMicroservice(microservice: Microservice): Observable<Microservice> {
        console.log("UPDATE", microservice)
        if (environment.useMockData) {
            let found = of(MICROSERVICES.find(oldService => oldService.id == microservice.id))
            if (found !== undefined) {
                return <Observable<Microservice>>found;
            } else {
                return of({})
            }
        } else {
            // Unfortunately, it is not possible to past Maps directly with http.put
            // Therefore, the conversion into an any object is needed
            // see https://stackoverflow.com/questions/49292475/passing-typescript-map-as-a-part-of-angular4-http-post-request
            return this.http.put<Microservice>(this.entityUrl, microservice, httpOptions)
                .pipe(catchError(Utils.handleError));
        }
    }

    /** DELETE a microservice */
    deleteMicroservice(id: number): Observable<unknown> {
        const url = `${this.entityUrl}/${id}`;
        return this.http.delete(url, httpOptions)
            .pipe(catchError(Utils.handleError));
    }
}