import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {TeamService} from "../../shared/services/team.service";
import {Member} from "../../shared/models/member.model";
import {Team} from "../../shared/models/team.model";
import {MicroserviceService} from "../../shared/services/microservice.service";
import {Microservice} from "../../shared/models/microservice.model";
import {MemberService} from "../../shared/services/member.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SelectMemberDialogComponent} from "./select-member-dialog/select-member-dialog.component";
import {SelectMicroserviceDialogComponent} from "./select-microservice-dialog/select-microservice-dialog.component";

@Component({
    selector: 'app-edit-team',
    templateUrl: './edit-team.component.html',
    styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit, OnDestroy {
    sysId: number = 0;

    editTeam: Team | undefined;
    editTeamServices = new Map<number, Microservice>();
    editTeamMembers = new Map<number, Member>();
    routerSub: Subscription | undefined;
    routerSysSub: Subscription | undefined;
    updateSub: Subscription | undefined;
    serviceSub: Subscription | undefined;

    constructor(private teamService: TeamService,
                private microserviceService: MicroserviceService,
                private memberService: MemberService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.routerSysSub = this.activatedRoute.paramMap.subscribe((params) => {
            this.sysId = parseInt(<string>params.get('sysId'));
        });

        this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
            var id: number = parseInt(<string>params.get('id'))
            this.serviceSub = this.teamService.getTeam(id).subscribe(
                (team) => {
                    this.editTeam = team;
                    this.prepareServices();
                    this.prepareMembers();
                }
            )
        });
    }

    ngOnDestroy(): void {
        this.routerSub?.unsubscribe();
        this.routerSysSub?.unsubscribe();
        this.updateSub?.unsubscribe();
    }

    prepareServices(): void {
        this.editTeam?.ownedMicroserviceIds?.forEach(
            serviceId => {
                this.microserviceService.getMicroservice(serviceId).subscribe(
                    microservice => this.editTeamServices.set(serviceId, microservice))
            }
        )
    }

    prepareMembers(): void {
        this.editTeam?.memberIds?.forEach(
            memberId => {
                this.memberService.getMember(memberId).subscribe(
                    member => this.editTeamMembers.set(memberId, member))
            }
        )
    }

    save() {
        if (this.editTeam) {
            this.editTeam!.memberIds = Array.from(this.editTeamMembers.keys())
        }
        if (this.editTeam) {
            this.editTeam!.ownedMicroserviceIds = Array.from(this.editTeamServices.keys())
        }
        this.updateSub = this.teamService.updateTeam(this.editTeam!).subscribe(value => {
            this.openSnackBar(`${value.name} Team Updated!`, "SUCCESS");
            this.router.navigate([`/system/${this.sysId}/teams`]);
        })
    }

    abort() {
        this.router.navigate([`/system/${this.sysId}/teams`]);
    }

    removeService(id: number) {
        this.editTeamServices.delete(id);
    }

    removeMember(id: number) {
        this.editTeamMembers.delete(id);
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    openMemberDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {sysId: this.sysId};

        const dialogRef = this.dialog.open(SelectMemberDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let newMembers: Member[] = result;
                newMembers.forEach(value => {
                    if (value.id != null) {
                        this.editTeamMembers.set(value.id, value)
                    }
                })
            }
        });
    }

    openMicroserviceDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {sysId: this.sysId};

        const dialogRef = this.dialog.open(SelectMicroserviceDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let newMicroservices: Microservice[] = result;
                newMicroservices.forEach(value => {
                    if (value.id != null) {
                        this.editTeamServices.set(value.id, value)
                    }
                })
            }
        });
    }
}
