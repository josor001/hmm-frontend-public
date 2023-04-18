import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {TeamService} from "../../shared/services/team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Microservice} from "../../shared/models/microservice.model";
import {MicroserviceService} from "../../shared/services/microservice.service";
import {MemberService} from "../../shared/services/member.service";

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  editService: Microservice | undefined;
  routerSub: Subscription | undefined;
  serviceSub: Subscription | undefined;
  constructor(private microserviceService:MicroserviceService,
              private teamService:TeamService,
              private memberService:MemberService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
      var id : number = parseInt(<string>params.get('id'))
      console.log(id);
      this.serviceSub = this.microserviceService.getMicroservice(id).subscribe(
          (microservice) => {this.editService = microservice;}
      )
    });
  }
  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
  save() {

  }

  abort() {

  }


}
