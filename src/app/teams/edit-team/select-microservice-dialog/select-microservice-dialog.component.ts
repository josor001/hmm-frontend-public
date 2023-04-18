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

  constructor(public dialogRef: MatDialogRef<SelectMicroserviceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Microservice[],
              private microserviceService: MicroserviceService) {
    this.alreadyIncluded = data;
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subGet.unsubscribe();
  }

  ngOnInit(): void {
    this.subGet = this.microserviceService.getMicroservices().subscribe(
        microservices => {this.microservices = microservices;}
    );
    //reduce microservices regarding microservices already owned by team.
    this.microservices = this.microservices.filter(microservice => this.alreadyIncluded.indexOf(microservice) < 0);
  }
}