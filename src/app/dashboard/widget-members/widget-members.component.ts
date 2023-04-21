import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MemberService} from "../../shared/services/member.service";

@Component({
  selector: 'app-widget-members',
  templateUrl: './widget-members.component.html',
  styleUrls: ['./widget-members.component.scss']
})
export class WidgetMembersComponent implements OnInit, OnDestroy {
  numberOfMembers: number = 0;
  sub: Subscription | undefined;

  constructor(private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.sub = this.memberService.getMembers().subscribe(members => {
      this.numberOfMembers = members.length
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}
