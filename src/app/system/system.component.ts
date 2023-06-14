import {Component, OnDestroy, OnInit} from '@angular/core';
import { Microservice } from '../shared/models/microservice.model';
import { MemberService } from '../shared/services/member.service';
import { MicroserviceService } from '../shared/services/microservice.service';
import {SoftwaresystemService} from "../shared/services/softwaresystem.service";
import {Softwaresystem} from "../shared/models/softwaresystem.model";
import {lastValueFrom, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteSystemDialogComponent} from "./delete-system-dialog/delete-system-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  AddFeatureDialogComponent
} from "../microservices/edit-microservice/add-feature-dialog/add-feature-dialog.component";

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
  editMode: Boolean = false;

  constructor(private systemService: SoftwaresystemService,
              private activatedRoute:ActivatedRoute,
              public dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activeRouterSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.sysId = parseInt(<string>params.get('sysId'));
    });
    // then query the backend for systemId
    this.systemSub = this.systemService.getSoftwaresystem(this.sysId).subscribe(system => {
      this.system = system;
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

  update() {
    if(this.system && this.system.name && this.system.description) {
      this.systemService.updateSoftwaresystem(this.system!!).subscribe(res => {
        this.openSnackBar("Update successful.", "SUCCESS");
        this.system = res;
        this.editMode = false;
      })
    } else {
      this.openSnackBar("Please fill all fields.", "ERROR");
    }

  }
  abort() {
    this.systemSub = this.systemService.getSoftwaresystem(this.sysId).subscribe(res => {
      this.system = res;
      this.editMode = false;
    })
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteSystemDialogComponent, {
      data: this.system
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && this.system && this.system.id ) {
        this.systemService.deleteSoftwaresystem(this.system.id).subscribe(value => {
          if(value) {
            this.openSnackBar("System deleted! Reloading in 3 seconds...", "SUCCESS");
            setTimeout(() =>
                {
                  window.location.reload();
                },
                3000);
          }


        });
      }
    });
  }
}
