import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Microservice} from "../../shared/models/microservice.model";
import {MicroserviceService} from "../../shared/services/microservice.service";

@Component({
  selector: 'app-add-microservice',
  templateUrl: './add-microservice.component.html',
  styleUrls: ['./add-microservice.component.scss']
})
export class AddMicroserviceComponent implements OnInit, OnDestroy {
  sysId: number = 0;
  newMicroservice: Microservice | undefined;
  sub: Subscription | undefined;
  routerSub: Subscription | undefined;

  constructor(private microserviceService: MicroserviceService,
              private router: Router,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.newMicroservice = {name: ""}

    this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.sysId = parseInt(<string>params.get('sysId'));
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  abort(): void {
    this.router.navigate([`/system/${(this.sysId)}/microservices`]);
  }


  save() {
    if (this.newMicroservice && this.newMicroservice.name) {
      this.sub = this.microserviceService.createMicroservice(this.newMicroservice.name).subscribe(
          newServ => {
            this.openSnackBar("New microservice " + newServ.name + " saved!", "SUCCESS");
            this.router.navigate([`/system/${this.sysId}/microservices`]);
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