import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TeamsComponent} from "./teams/teams.component";
import {MicroservicesComponent} from "./microservices/microservices.component";
import {OrganizationComponent} from "./organization/organization.component";
import {SystemComponent} from "./system/system.component";
import {MembersComponent} from "./members/members.component";
import {EditMemberComponent} from "./members/edit-member/edit-member.component";
import {AddMemberComponent} from "./members/add-member/add-member.component";
import {EditTeamComponent} from "./teams/edit-team/edit-team.component";
import {EditServiceComponent} from "./microservices/edit-service/edit-service.component";
import {ServiceStoriesComponent} from "./service-stories/service-stories.component";
import {AddMicroserviceComponent} from "./microservices/add-microservice/add-microservice.component";
import {AddTeamComponent} from "./teams/add-team/add-team.component";
import {AddStoryComponent} from "./service-stories/add-story/add-story.component";
import {EditStoryComponent} from "./service-stories/edit-story/edit-story.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'system', component: SystemComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/edit/:id', component: EditTeamComponent },
  { path: 'teams/new', component: AddTeamComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'members', component: MembersComponent },
  { path: 'members/edit/:id', component: EditMemberComponent },
  { path: 'members/new', component: AddMemberComponent },
  { path: 'microservices', component: MicroservicesComponent },
  { path: 'microservices/edit/:id', component: EditServiceComponent },
  { path: 'microservices/new', component: AddMicroserviceComponent },
  { path: 'stories', component: ServiceStoriesComponent },
  { path: 'stories/edit/:id', component: EditStoryComponent },
  { path: 'stories/new', component: AddStoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }