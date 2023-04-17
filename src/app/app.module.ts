import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { SystemComponent } from './system/system.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from  '@angular/material/sidenav';
import {MatListModule} from  '@angular/material/list';
import {MatButtonModule } from  '@angular/material/button';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MicroservicesComponent } from './microservices/microservices.component';
import { OrganizationComponent } from './organization/organization.component';
import {MatSelectModule} from "@angular/material/select";
import { MembersComponent } from './members/members.component';
import {MatTableModule} from "@angular/material/table";
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import {MatInputModule} from "@angular/material/input";
import { AddMemberComponent } from './members/add-member/add-member.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { EditTeamComponent } from './teams/edit-team/edit-team.component';
import { EditServiceComponent } from './microservices/edit-service/edit-service.component';


@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    SystemComponent,
    DashboardComponent,
    MicroservicesComponent,
    OrganizationComponent,
    MembersComponent,
    EditMemberComponent,
    AddMemberComponent,
    EditTeamComponent,
    EditServiceComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        LayoutModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatInputModule,
        MatSnackBarModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
