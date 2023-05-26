import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddModelArtifactDialogComponent} from "./add-model-artifact-dialog/add-model-artifact-dialog.component";
import {ModelArtifact} from "../shared/models/modelartifact.model";
import {Subscription} from "rxjs";
import {MicroserviceService} from "../shared/services/microservice.service";
import {TeamService} from "../shared/services/team.service";
import {MemberService} from "../shared/services/member.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModelArtifactService} from "../shared/services/modelartifact.service";
import {Microservice} from "../shared/models/microservice.model";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-model-artifacts',
  templateUrl: './model-artifacts.component.html',
  styleUrls: ['./model-artifacts.component.scss']
})
export class ModelArtifactsComponent implements OnInit, OnDestroy {
  //TODO create a new menu entry and design HTML side for this component
  //TODO clear residues from edit-microservice regarding this shit.
  //TODO clear microservice overview concerning modelartifacts and maybe also planned features (make overview simply more simple ^^)
  sysId: number = 0;

  microservices: Microservice[] = [];
  modelArtifacts: ModelArtifact[] = [];

  routerSub: Subscription | undefined;
  serviceSub: Subscription | undefined;
  artifactSub: Subscription | undefined;


  constructor(private microserviceService: MicroserviceService,
              private modelArtifactService: ModelArtifactService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.sysId = parseInt(<string>params.get('sysId'));
    });
    this.getMicroservices();
    this.getModelArtifacts();
  }

  ngOnDestroy(): void {
    this.artifactSub?.unsubscribe();
    this.routerSub?.unsubscribe();
    this.serviceSub?.unsubscribe();
  }


  getMicroservices(): void {
    this.serviceSub = this.microserviceService.getMicroservices(this.sysId).subscribe(services => {
      this.microservices = services
    });
  }

  getModelArtifacts(): void {
    //TODO service for model artifacts (front & backend!)
    this.artifactSub = this.modelArtifactService.getModelArtifacts(this.sysId).subscribe(artifacts => {
      this.modelArtifacts = artifacts
    });
  }

  openArtifactNewDialog(): void {
    const dialogRef = this.dialog.open(AddModelArtifactDialogComponent, {
      //fill if there is any data
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        //TODO do something with the newly created artifact
      }
    });
  }

  removeArtifact(artifact: ModelArtifact) {
    this.editServiceModelArtifacts.delete(artifact)
  }




}
