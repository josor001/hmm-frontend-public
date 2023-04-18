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
  newMicroservice: Microservice | undefined;
  sub: Subscription | undefined;

  constructor(private microserviceService: MicroserviceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.newMicroservice = {name: ""}
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  abort(): void {
    this.router.navigate(['/microservices']);
  }


  save() {
    if (this.newMicroservice && this.newMicroservice.name) {
      this.sub = this.microserviceService.createMicroservice(this.newMicroservice.name).subscribe(
          newServ => {
            this.openSnackBar("New microservice " + newServ.name + " saved!", "SUCCESS");
            this.router.navigate(['/microservices']);
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