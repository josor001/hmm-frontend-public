import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MODEL_KIND} from "../../../shared/models/modelkind.enum";

export interface DialogModelArtifact {
    name: string;
    kind: string;
    location: string;
}

@Component({
    selector: 'app-view-artifact-dialog',
    templateUrl: './view-artifact-dialog.component.html',
    styleUrls: ['./view-artifact-dialog.component.scss']
})
export class ViewArtifactDialogComponent {

    artifact: DialogModelArtifact = {name: "", kind: "", location: ""}

    constructor(public dialogRef: MatDialogRef<ViewArtifactDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.artifact = data.artifact;
        console.log(this.artifact)
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }

    close() {
        this.dialogRef.close();
    }

    protected readonly MODEL_KIND = MODEL_KIND;
}