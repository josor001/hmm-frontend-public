import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  // URL to web api
  private entityUrl = environment.serverUrl+'/organizations';

  constructor() { }
}
