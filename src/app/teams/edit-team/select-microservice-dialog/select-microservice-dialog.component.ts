import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Microservice} from "../../../shared/models/microservice.model";
import {MicroserviceService} from "../../../shared/services/microservice.service";

@Component({
  selector: 'app-select-microservice-dialog',
  templateUrl: './select-microservice-dialog.component.html',
  styleUrls: ['./select-microservice-dialog.component.scss']
})
export class SelectMicroserviceDialogComponent implements OnInit, OnDestroy {
  alreadyIncluded: Microservice[] = [];
  subGet: any;
  microservices: Microservice[] = [];
  selectedMicroservices: Microservice[] = [];
  sysId : number = 0;

  constructor(public dialogRef: MatDialogRef<SelectMicroserviceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private microserviceService: MicroserviceService) {
    console.log(data)
    if(Array.isArray(data)) {
      this.alreadyIncluded = data;
      if(this.alreadyIncluded[0].sysId) {
        this.sysId = this.alreadyIncluded[0].sysId
      }
    } else {
      //if no array of Members is set, data contains the sysId as value of the field sysId (see edit-team component)
      this.sysId = data.sysId;
    }
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
          //reduces dialog by microservices already owned by team.
          this.microservices = this.microservices.filter(microservice => {
            return this.alreadyIncluded.map(value => value.id).indexOf(microservice.id) < 0;
          })
        }
    );

  }
}