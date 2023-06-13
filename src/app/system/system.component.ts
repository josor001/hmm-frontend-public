import {Component, OnDestroy, OnInit} from '@angular/core';
import { Microservice } from '../shared/models/microservice.model';
import { MemberService } from '../shared/services/member.service';
import { MicroserviceService } from '../shared/services/microservice.service';
import {SoftwaresystemService} from "../shared/services/softwaresystem.service";
import {Softwaresystem} from "../shared/models/softwaresystem.model";
import {lastValueFrom, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit, OnDestroy {

  system : Softwaresystem | undefined;
  sysId: number = 1;

  activeRouterSub: Subscription | undefined;
  systemSub: Subscription | undefined;

  constructor(private systemService: SoftwaresystemService,
              private activatedRoute:ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activeRouterSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.sysId = parseInt(<string>params.get('sysId'));
    });

    console.log(this.sysId)
    // then query the backend for systemId
    this.systemSub = this.systemService.getSoftwaresystem(this.sysId).subscribe(system => {
      this.system = system;
      console.log(this.sysId, "in sub")
      console.log(this.system)
    })
  }

  ngOnDestroy(): void {
    this.systemSub?.unsubscribe();
    this.activeRouterSub?.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  openNewDialog() {
    //TODO
  }
}
