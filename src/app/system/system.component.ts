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

  constructor(private microserviceService: MicroserviceService, private memberService: MemberService) { }

  selectedMicroservice?: Microservice;
  microservices?: Microservice[];
  serviceId?: number;

  getMicroservices(): void {
    this.microserviceService.getMicroservices().subscribe(microservices => this.microservices = microservices)
  }

  getMicroservice(id: number): void {
    this.microserviceService.getMicroservice(id).subscribe(microservice => this.selectedMicroservice = microservice)
  }

  ngOnInit(): void {
    this.memberService.createMember("jonas", "sorgalla", "jonas@fh-dortmund.de").subscribe(
      member => console.log('There is a new member: '+member)
    )    
  }

}
