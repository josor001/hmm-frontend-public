import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AddModelArtifactDialogComponent} from "./add-model-artifact-dialog/add-model-artifact-dialog.component";
import {ModelArtifact} from "../shared/models/modelartifact.model";
import {Subscription} from "rxjs";
import {MicroserviceService} from "../shared/services/microservice.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModelArtifactService} from "../shared/services/modelartifact.service";
import {Microservice} from "../shared/models/microservice.model";
import {MatDialog} from "@angular/material/dialog";
import {MatTable, MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-model-artifacts',
  templateUrl: './model-artifacts.component.html',
  styleUrls: ['./model-artifacts.component.scss']
})
export class ModelArtifactsComponent implements OnInit, OnDestroy {
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
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

  findMicroserviceName(id: number) : string {
    const service = this.microservices.find(value => value.id === id)
    if(service)
      return service.name!!
    return "no service found"
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
            this.sysId).subscribe(value => {
                  //a somewhat dirty refresh
                  this.openSnackBar(`New ModelArtifact ${value.name} added!`, "SUCCESS")
                  this.getModelArtifacts();
                }
        );
      }
    });
  }

  removeArtifact(artifactId: number) {
    this.modelArtifactService.deleteModelArtifact(artifactId).subscribe(value => {
      this.openSnackBar(`ModelArtifact deleted!`, "SUCCESS")
      this.dataSource.data = this.dataSource.data.filter(value => value.id !== artifactId);
    })
  }
}
