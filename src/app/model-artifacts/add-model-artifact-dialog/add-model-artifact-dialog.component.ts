import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogFeature} from "../../microservices/edit-microservice/add-feature-dialog/add-feature-dialog.component";

export interface DialogModelArtifact {
  name: string;
  kind: string;
  location: string;
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
  artifact: DialogModelArtifact = {name:"",kind:"",location:""}

  kinds: ModelKind[] = [
    {value: 'graphical', viewValue: 'Graphical'},
    {value: 'textual', viewValue: 'Textual'},
    {value: 'lemma', viewValue: 'LEMMA'},
  ];

  constructor(public dialogRef: MatDialogRef<AddModelArtifactDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  validArtifact() : boolean {
    return !!(this.artifact.location && this.artifact.name && this.artifact.kind);

  }

  ngOnDestroy(): void {}
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
}
