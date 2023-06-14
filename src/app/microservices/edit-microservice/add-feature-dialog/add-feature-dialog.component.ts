import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogFeature {
  type: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-add-feature-dialog',
  templateUrl: './add-feature-dialog.component.html',
  styleUrls: ['./add-feature-dialog.component.scss']
})
export class AddFeatureDialogComponent implements OnInit {
  feature: DialogFeature = {type:"new",name:"",description:""}

  constructor(public dialogRef: MatDialogRef<AddFeatureDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogFeature) {
  }

  ngOnInit(): void {
    this.feature = this.data;
  }
  close() {
    this.dialogRef.close();
  }
}

