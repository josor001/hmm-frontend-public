import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TeamService} from "../../shared/services/team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Microservice} from "../../shared/models/microservice.model";
import {MicroserviceService} from "../../shared/services/microservice.service";
import {MemberService} from "../../shared/services/member.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Member} from "../../shared/models/member.model";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddFeatureDialogComponent, DialogFeature} from "./add-feature-dialog/add-feature-dialog.component";

@Component({
    selector: 'app-edit-microservice',
    templateUrl: './edit-microservice.component.html',
    styleUrls: ['./edit-microservice.component.scss']
})
export class EditMicroserviceComponent implements OnInit, OnDestroy {
    sysId: number = 0;

    editService: Microservice | undefined;
    editServiceTeamMember: Member[] = [];
    routerSub: Subscription | undefined;
    serviceSub: Subscription | undefined;
    routerSysSub: Subscription | undefined;
    teamSub: Subscription | undefined;
    updateSub: Subscription | undefined;

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    constructor(private microserviceService: MicroserviceService,
                private teamService: TeamService,
                private memberService: MemberService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.routerSysSub = this.activatedRoute.paramMap.subscribe((params) => {
            this.sysId = parseInt(<string>params.get('sysId'));
        });

        this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
            var id: number = parseInt(<string>params.get('id'))
            this.serviceSub = this.microserviceService.getMicroservice(id).subscribe(
                (microservice) => {
                    this.editService = microservice;
                    this.populateServiceTeam();
                    //if there are no features yet and therefore plannedFeatures is not initialized properly
                    //this creates an empty Map
                    if(!(this.editService.plannedFeatures instanceof Map)) {
                        this.editService.plannedFeatures = new Map<string, string>()
                    }
                }
            )
        });
    }

    ngOnDestroy(): void {
        this.routerSysSub?.unsubscribe();
        this.routerSub?.unsubscribe();
        this.updateSub?.unsubscribe();
        this.teamSub?.unsubscribe();
    }

    save() :void {
       if(this.editService && this.editService.name)  {
        this.updateSub = this.microserviceService.updateMicroservice(this.editService).subscribe(service => {
          this.openSnackBar(`${service.name} updated!`,"SUCCESS")
          this.router.navigate([`/system/${this.sysId}/microservices`]);
        })
      } else {
        this.openSnackBar("Something went wrong. Please fill all required fields.", "ERROR")
      }
    }

    abort() {
      this.router.navigate([`/system/${this.sysId}/microservices`]);
    }

    addFeature(): void {
        if(this.editService) {
            this.editService.plannedFeatures!!.set("testa", "aaa")
        }
    }

    console(): void {
        console.log(this.editService?.plannedFeatures)
    }

    removeFeature(featureKey: string): void {
        if (this.editService && this.editService.plannedFeatures) {
            this.editService.plannedFeatures.delete(featureKey)
            this.console()
        }
    }

    private populateServiceTeam() {
        if (this.editService && this.editService.id) {
            //First, get the Team by the ownedId.
            //Then get the actual Members based on the memberIds array from Team.
            this.teamSub = this.teamService.getTeamByMicroserviceId(this.editService.id).subscribe(team => {
                if(team && team.memberIds) {
                    team.memberIds?.forEach(memberId => {
                        this.memberService.getMember(memberId).subscribe(member => {
                            this.editServiceTeamMember.push(member)
                        })
                    })
                }
            });
        }
    }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

    openNewDialog(): void {
        const dialogRef = this.dialog.open(AddFeatureDialogComponent, {
            data: {type: "new", name: "", description: ""},
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.editService?.plannedFeatures?.set(result.name, result.description);
                console.log(this.editService?.plannedFeatures);
            }
        });
    }

    openEditDialog(name: string, description: string): void {
        const dialogRef = this.dialog.open(AddFeatureDialogComponent, {
            data: {type: "edit", name: name, description: description},
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.editService?.plannedFeatures?.set(result.name, result.description);
                console.log(this.editService?.plannedFeatures);
            }
        });
    }
}

