import { Component, OnInit } from '@angular/core';
import {MemberService} from "../shared/services/member.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MicroserviceService} from "../shared/services/microservice.service";

@Component({
  selector: 'app-microservices',
  templateUrl: './microservices.component.html',
  styleUrls: ['./microservices.component.scss']
})
export class MicroservicesComponent implements OnInit {

  constructor(private microserviceService: MicroserviceService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
