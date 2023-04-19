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
import {Team} from "../../shared/models/team.model";
import {Member} from "../../shared/models/member.model";

@Component({
    selector: 'app-edit-service',
    templateUrl: './edit-service.component.html',
    styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit, OnDestroy {
    editService: Microservice | undefined;
    editServiceTeamMember: Member[] = [];
    routerSub: Subscription | undefined;
    serviceSub: Subscription | undefined;
    teamSub: Subscription | undefined;
    //variables for feature chip input
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    constructor(private microserviceService: MicroserviceService,
                private teamService: TeamService,
                private memberService: MemberService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
            var id: number = parseInt(<string>params.get('id'))
            console.log(id);
            this.serviceSub = this.microserviceService.getMicroservice(id).subscribe(
                (microservice) => {
                    this.editService = microservice;
                }
            )
        });
        this.populateServiceTeam();
    }

    ngOnDestroy(): void {
        this.routerSub?.unsubscribe();
        this.teamSub?.unsubscribe();
    }

    save() {

    }

    abort() {

    }

    addFeature(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add feature
        if (value && this.editService) {
            this.editService.plannedFeatures!.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    removeFeature(feature: string): void {
        if (this.editService && this.editService.plannedFeatures) {
            const index = this.editService.plannedFeatures.indexOf(feature);
            if (index >= 0) {
                this.editService.plannedFeatures.splice(index, 1);
            }
        }
    }

    private populateServiceTeam() {
        if (this.editService && this.editService.id) {
            //First, get the Team by the ownedId.
            //Then get the actual Members based on the memberIds array from Team.
            this.teamSub = this.teamService.getTeamByMicroserviceId(this.editService.id).subscribe(team => {
              team.memberIds?.forEach(memberId => {
                this.memberService.getMember(memberId).subscribe(member => {
                  this.editServiceTeamMember.push(member)
                })
              })
            });
        }
    }
}
