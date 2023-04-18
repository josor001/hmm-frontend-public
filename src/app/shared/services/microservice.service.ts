import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Microservice} from '../models/microservice.model';
import {MICROSERVICES} from "../../../assets/mock-data/mock-microservices";
import Utils from "./Utils";
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
            return this.http.get<Microservice>(this.entityUrl + '/' + id);
        }

    }

    /** GET all microservices */
    getMicroservices(): Observable<Microservice[]> {
        if (environment.useMockData) {
            return of(MICROSERVICES);
        } else {
            return this.http.get<Microservice[]>(this.entityUrl);
        }
    }

    /** POST a new microservice */
    createMicroservice(name: string): Observable<Microservice> {
        if (environment.useMockData) {
            return of(<Microservice>{name: name, id: 1001});
        } else {
            return this.http.post<Microservice>(this.entityUrl, name, httpOptions)
                .pipe(catchError(Utils.handleError));
        }




    }

    /** PUT a microservice to be updated */
    updateMicroservice(microservice: Microservice): Observable<Microservice> {
        return this.http.put<Microservice>(this.entityUrl, microservice, httpOptions)
            .pipe(catchError(Utils.handleError));
    }

    /** PUT a new artifact into a microservice */
    addModelArtifact(serviceId: number, artifactId: number): Observable<Microservice> {
        const url = `${this.entityUrl}/${serviceId}/artifacts`;
        return this.http.put<Microservice>(url, artifactId, httpOptions)
            .pipe(catchError(Utils.handleError));
    }

    /** DELETE an artifact from a microservice */
    removeModelArtifact(serviceId: number, artifactId: number): Observable<unknown> {
        const url = `${this.entityUrl}/${serviceId}/artifacts/${artifactId}`;
        return this.http.delete(url, httpOptions)
            .pipe(catchError(Utils.handleError));
    }

    /** DELETE a microservice */
    deleteMicroservice(id: number): Observable<unknown> {
        const url = `${this.entityUrl}/${id}`;
        return this.http.delete(url, httpOptions)
            .pipe(catchError(Utils.handleError));
    }
}