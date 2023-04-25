import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MemberService} from "../../../shared/services/member.service";
import {Member} from "../../../shared/models/member.model";
import {TeamService} from "../../../shared/services/team.service";

@Component({
  selector: 'app-select-member-dialog',
  templateUrl: './select-member-dialog.component.html',
  styleUrls: ['./select-member-dialog.component.scss']
})
export class SelectMemberDialogComponent implements OnInit, OnDestroy {
  subGet: any;
  members: Member[] = [];
  selectedMembers: Member[] = [];
  sysId: number = 0;

  constructor(public dialogRef: MatDialogRef<SelectMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private memberService: MemberService,
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
    this.subGet = this.memberService.getMembers(this.sysId).subscribe(
        members => {
          this.members = members;
          //OLD reduce members regarding members already included with the team.
          /* this.members = this.members.filter(member => {
            return this.alreadyIncluded.map(m => m.id).indexOf(member.id) < 0;
          });*/

          //NEW reduce this.members regarding members, that are already owned by ANY other team
          this.members.forEach(member => {
            this.teamService.getTeamByMemberId(member.id!).subscribe(team => {
              if(team) {
                this.members = this.members.filter(value => {
                  if(team.memberIds) {
                    return !team.memberIds.includes(value.id!);
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