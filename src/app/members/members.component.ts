import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Member} from "../shared/models/member.model";
import {MEMBERS} from "../../assets/mock-data/mock-members";
import {MatTable} from "@angular/material/table";

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
export class MembersComponent implements OnInit {
  dataSource = MEMBERS;
  showEditComponent: boolean = false;
  columnsToDisplay = ['firstname', 'lastname', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedMember: Member | null | undefined;

  @ViewChild(MatTable)
  table!: MatTable<Member>;

  addData() {
    //const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    //this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    //this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

  constructor() { }

  ngOnInit(): void {
    this.showEditComponent = false;
  }

  toggleMe() {
    this.showEditComponent = !this.showEditComponent;
  }
}