import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MemberService} from "../../../shared/services/member.service";
import {Member} from "../../../shared/models/member.model";

@Component({
  selector: 'app-select-member-dialog',
  templateUrl: './select-member-dialog.component.html',
  styleUrls: ['./select-member-dialog.component.scss']
})
export class SelectMemberDialogComponent implements OnInit, OnDestroy {
  alreadyIncluded: Member[] = [];
  subGet: any;
  members: Member[] = [];
  selectedMembers: Member[] = [];
  sysId: number = 0;

  constructor(public dialogRef: MatDialogRef<SelectMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private memberService: MemberService) {
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
    this.subGet = this.memberService.getMembers(this.sysId).subscribe(
        members => {
          this.members = members;
          //reduce members regarding members already included with team.
          this.members = this.members.filter(member => {
            return this.alreadyIncluded.map(m => m.id).indexOf(member.id) < 0;
          });
        }
    );
  }
}