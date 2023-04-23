import { Component, OnInit } from '@angular/core';
import { Microservice } from '../shared/models/microservice.model';
import { MemberService } from '../shared/services/member.service';
import { MicroserviceService } from '../shared/services/microservice.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}
