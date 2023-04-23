import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Member} from "../shared/models/member.model";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MemberService} from "../shared/services/member.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

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
  sysId: number = 0;
  dataSource = new MatTableDataSource<Member>();
  columnsToDisplay = ['firstname', 'lastname', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedMember: Member | null | undefined;

  @ViewChild(MatTable)
  table!: MatTable<Member>;

  routerSub: Subscription | undefined;
  subGet: Subscription | undefined;

  constructor(private memberService: MemberService, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.subGet?.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.sysId = parseInt(<string>params.get('sysId'));
    });

    this.subGet = this.memberService.getMembers(this.sysId).subscribe(
        members => {
          this.dataSource.data = members;
        }
    );

  }

  deleteMember(id: number) {
    this.memberService.deleteMember(id).subscribe(
        value => {
          this.openSnackBar("Member deleted.", "SUCCESS");
          this.subGet = this.memberService.getMembers(this.sysId).subscribe(
              members => {
                this.dataSource.data = members;
              }
          );
        }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}