import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogFeature} from "../../microservices/edit-microservice/add-feature-dialog/add-feature-dialog.component";

export interface DialogModelArtifact {
  name: string;
  kind: string;
  location: string;
  microserviceId: number;
}

interface ModelKind {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-model-artifact-dialog',
  templateUrl: './add-model-artifact-dialog.component.html',
  styleUrls: ['./add-model-artifact-dialog.component.scss']
})
export class AddModelArtifactDialogComponent {
  artifact: DialogModelArtifact = {name:"",kind:"",location:"", microserviceId:0}
  microserviceIdsWithNames: Map<number, string>;

  kinds: ModelKind[] = [
    {value: 'graphical', viewValue: 'Graphical'},
    {value: 'textual', viewValue: 'Textual'},
    {value: 'lemma', viewValue: 'LEMMA'},
  ];

  constructor(public dialogRef: MatDialogRef<AddModelArtifactDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any) {
    this.microserviceIdsWithNames = new Map<number, string>(data.microserviceIdsWithNames);
    console.log(data);
  }

  validArtifact() : boolean {
    return !!(this.artifact.location && this.artifact.name && this.artifact.kind && this.artifact.microserviceId!=0);

  }

  ngOnDestroy(): void {}
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
}
