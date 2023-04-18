import {Component, OnDestroy, OnInit} from '@angular/core';
import {Member} from "../../shared/models/member.model";
import {MemberService} from "../../shared/services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit, OnDestroy {

  editMember: Member | undefined;
  routerSub: Subscription | undefined;
  serviceSub: Subscription | undefined;

  constructor(private memberService : MemberService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
      var id : number = parseInt(<string>params.get('id'))
      console.log(id);
      this.serviceSub = this.memberService.getMember(id).subscribe(
          (member) => {this.editMember = member;}
      )
    });
  }

  ngOnDestroy() {
    if (this.routerSub) this.routerSub.unsubscribe();
    if (this.serviceSub) this.serviceSub.unsubscribe();
  }

  abort(): void {
    this.router.navigate(['/members']);
  }


  save() {
    if(this.editMember == undefined || this.editMember.id == undefined) {
      this.openSnackBar("Something went wrong. No actual member selected!", "ERROR");
    } else {
      this.memberService.updateMember(<Member>this.editMember);
      this.openSnackBar("Member saved!", "SUCCESS");
      this.router.navigate(['/members']);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
