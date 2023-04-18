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

  constructor(public dialogRef: MatDialogRef<SelectMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Member[],
              private memberService: MemberService) {
    this.alreadyIncluded = data;
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subGet.unsubscribe();
  }

  ngOnInit(): void {
    this.subGet = this.memberService.getMembers().subscribe(
        members => {this.members = members;}
    );
    //reduce members regarding members already included with team.
    this.members = this.members.filter(member => this.alreadyIncluded.indexOf(member) < 0);
  }
}