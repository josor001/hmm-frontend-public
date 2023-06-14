import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  DialogModelArtifact
} from "../../microservices/view-microservice/view-artifact-dialog/view-artifact-dialog.component";
import {Softwaresystem} from "../../shared/models/softwaresystem.model";

@Component({
  selector: 'app-delete-system-dialog',
  templateUrl: './delete-system-dialog.component.html',
  styleUrls: ['./delete-system-dialog.component.scss']
})
export class DeleteSystemDialogComponent {

  system: Softwaresystem;

  constructor(public dialogRef: MatDialogRef<DeleteSystemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.system = data;
  }

  close() {
    this.dialogRef.close();
  }
}
