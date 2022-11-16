import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Microservice } from '../models/microservice.model';

@Injectable({
  providedIn: 'root'
})
export class MicroserviceService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/microservices';

  constructor(private http: HttpClient) { }

  /** GET all microservices from the server */
  getMicroservices(): Observable<Microservice[]> {
    return this.http.get<Microservice[]>(this.entityUrl)
  }

  /** GET a specific microservice by its ID from the server */
  getMicroservice(id: number): Observable<Microservice> {
      return this.http.get<Microservice>(this.entityUrl+'/'+id)
  }
}
