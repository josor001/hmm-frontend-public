import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Member} from "../shared/models/member.model";

@Component({
  selector: 'app-model-artifacts',
  templateUrl: './model-artifacts.component.html',
  styleUrls: ['./model-artifacts.component.scss']
})
export class ModelArtifactsComponent implements OnInit, OnDestroy {
  //TODO create a new menu entry and design HTML side for this component
  //TODO clear residues from edit-microservice regarding this shit.
  //TODO clear microservice overview concerning model artifacts and maybe also planned features (make overview simply more simple ^^)
  sysId: number = 0;

  microservices: Microservice[] = [];

  dataSource = new MatTableDataSource<ModelArtifact>();
  displayedColumns = ['name', 'microserviceId', 'kind', 'location', 'actions'];
  @ViewChild(MatTable)
  table!: MatTable<ModelArtifact>;

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
    this.artifactSub = this.modelArtifactService.getModelArtifacts(this.sysId).subscribe(artifacts => {
      this.dataSource.data = artifacts;
    });
  }

  openArtifactNewDialog(): void {
    //create a map with id and service names for selecting a microservice in the artifact dialog
    let microserviceIdsWithNames = new Map<number, string>();
    this.microservices.forEach(service => {
      if(service.id && service.name)
        microserviceIdsWithNames.set(service.id, service.name)
    })

    const dialogRef = this.dialog.open(AddModelArtifactDialogComponent, {
      data: {microserviceIdsWithNames},
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result)
        this.modelArtifactService.createModelArtifact(
            result.name,
            result.kind,
            result.location,
            result.microserviceId,
            this.sysId).subscribe(
                //TODO apparently this does not work or is not called? It might be necessary to refresh the datasource here
                newArtifact => {this.dataSource.data.push(newArtifact)}
        );
      }
    });
  }

  removeArtifact(artifactId: number) {
    this.dataSource.data = this.dataSource.data.filter(value => value.id !== artifactId);
  }




}
