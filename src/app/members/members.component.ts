import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Member} from "../shared/models/member.model";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MemberService} from "../shared/services/member.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MembersComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Member>();
  columnsToDisplay = ['firstname', 'lastname', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedMember: Member | null | undefined;

  @ViewChild(MatTable)
  table!: MatTable<Member>;

  subGet: any;

  constructor(private memberService: MemberService, private snackBar: MatSnackBar) {
  }

  ngOnDestroy(): void {
    this.subGet.unsubscribe();
  }

  ngOnInit(): void {
    this.subGet = this.memberService.getMembers().subscribe(
        members => {
          this.dataSource.data = members;
        }
    );
  }

  deleteMember(id: number) {
    this.memberService.deleteMember(id).subscribe(
        value => {
          this.openSnackBar("Member deleted.", "SUCCESS");
        }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}