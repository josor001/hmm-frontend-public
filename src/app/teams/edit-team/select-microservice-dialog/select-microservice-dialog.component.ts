import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Microservice} from "../../../shared/models/microservice.model";
import {MicroserviceService} from "../../../shared/services/microservice.service";
import {TeamService} from "../../../shared/services/team.service";

@Component({
  selector: 'app-select-microservice-dialog',
  templateUrl: './select-microservice-dialog.component.html',
  styleUrls: ['./select-microservice-dialog.component.scss']
})
export class SelectMicroserviceDialogComponent implements OnInit, OnDestroy {
  subGet: any;
  microservices: Microservice[] = [];
  selectedMicroservices: Microservice[] = [];
  sysId : number = 0;

  constructor(public dialogRef: MatDialogRef<SelectMicroserviceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private microserviceService: MicroserviceService,
              private teamService: TeamService) {
    this.sysId = data.sysId;
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subGet.unsubscribe();
  }

  ngOnInit(): void {
    this.subGet = this.microserviceService.getMicroservices(this.sysId).subscribe(
        microservices => {
          this.microservices = microservices;
          //OLD reduces dialog by microservices already owned by the team.
          /*
          this.microservices = this.microservices.filter(microservice => {
            return this.alreadyIncluded.map(value => value.id).indexOf(microservice.id) < 0;
          })*/

          //NEW reduce this.microservices regarding services, that are already owned by ANY other team
          this.microservices.forEach(microservice => {
            this.teamService.getTeamByMicroserviceId(microservice.id!).subscribe(team => {
              if(team) {
                this.microservices = this.microservices.filter(value => {
                  if(team.ownedMicroserviceIds) {
                    return !team.ownedMicroserviceIds.includes(value.id!);
                  } else
                    return true
                })
              }
            })
          })


        }
    );

  }
}