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
import { EditMicroserviceComponent } from './microservices/edit-microservice/edit-microservice.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ServiceStoriesComponent } from './service-stories/service-stories.component';
import { SelectMemberDialogComponent } from './teams/edit-team/select-member-dialog/select-member-dialog.component';
import { SelectMicroserviceDialogComponent } from './teams/edit-team/select-microservice-dialog/select-microservice-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AddMicroserviceComponent } from './microservices/add-microservice/add-microservice.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {NgxGraphModule} from '@swimlane/ngx-graph';
import { AddTeamComponent } from './teams/add-team/add-team.component';
import { AddStoryComponent } from './service-stories/add-story/add-story.component';
import { EditStoryComponent } from './service-stories/edit-story/edit-story.component';
import { WidgetMicroservicesComponent } from './dashboard/widget-microservices/widget-microservices.component';
import { WidgetTeamsComponent } from './dashboard/widget-teams/widget-teams.component';
import { WidgetStoriesComponent } from './dashboard/widget-stories/widget-stories.component';
import { WidgetMembersComponent } from './dashboard/widget-members/widget-members.component';
import { ViewMicroserviceComponent } from './microservices/view-microservice/view-microservice.component';

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
    EditMicroserviceComponent,
    ServiceStoriesComponent,
    SelectMemberDialogComponent,
    SelectMicroserviceDialogComponent,
    AddMicroserviceComponent,
    AddTeamComponent,
    AddStoryComponent,
    EditStoryComponent,
    WidgetMicroservicesComponent,
    WidgetTeamsComponent,
    WidgetStoriesComponent,
    WidgetMembersComponent,
    ViewMicroserviceComponent,
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
        MatChipsModule,
        MatTooltipModule,
        MatDialogModule,
        MatExpansionModule,
        NgxGraphModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
