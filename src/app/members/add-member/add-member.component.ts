import {Component, OnDestroy, OnInit} from '@angular/core';
import {Member} from "../../shared/models/member.model";
import {MemberService} from "../../shared/services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit, OnDestroy {
  sysId: number = 0;

  newMember: Member | undefined;
  sub: Subscription | undefined;
  routerSub: Subscription | undefined;

  constructor(private memberService : MemberService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.newMember = {firstname: "", lastname: "", email: ""}
    this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.sysId = parseInt(<string>params.get('sysId'));
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  abort(): void {
    this.router.navigate([`/system/${this.sysId}/members`]);
  }


  save() {
    if(this.newMember && this.newMember.firstname && this.newMember.lastname && this.newMember.email && (this.sysId != 0)) {
      this.sub = this.memberService.createMember(this.newMember.firstname, this.newMember.lastname, this.newMember.email, this.sysId).subscribe(
          newMem => {
            this.openSnackBar("New member "+newMem.firstname+" saved!", "SUCCESS");
            this.router.navigate([`/system/${this.sysId}/members`]);
          }
      );
    } else {
      this.openSnackBar("Something went wrong. Please fill in all fields.", "ERROR");
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

