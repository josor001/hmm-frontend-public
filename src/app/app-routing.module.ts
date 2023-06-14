import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TeamsComponent} from "./teams/teams.component";
import {MicroservicesComponent} from "./microservices/microservices.component";
import {SystemComponent} from "./system/system.component";
import {MembersComponent} from "./members/members.component";
import {EditMemberComponent} from "./members/edit-member/edit-member.component";
import {AddMemberComponent} from "./members/add-member/add-member.component";
import {EditTeamComponent} from "./teams/edit-team/edit-team.component";
import {EditMicroserviceComponent} from "./microservices/edit-microservice/edit-microservice.component";
import {ServiceStoriesComponent} from "./service-stories/service-stories.component";
import {AddMicroserviceComponent} from "./microservices/add-microservice/add-microservice.component";
import {AddTeamComponent} from "./teams/add-team/add-team.component";
import {AddStoryComponent} from "./service-stories/add-story/add-story.component";
import {EditStoryComponent} from "./service-stories/edit-story/edit-story.component";
import {ViewMicroserviceComponent} from "./microservices/view-microservice/view-microservice.component";
import {ModelArtifactsComponent} from "./model-artifacts/model-artifacts.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {NewSystemComponent} from "./system/new-system/new-system.component";

const routes: Routes = [//
  { path: '', redirectTo: '/system/1/dashboard', pathMatch:'full' },
  { path: 'system/:sysId/dashboard', component: DashboardComponent },
  { path: 'system/:sysId', component: SystemComponent },
  { path: 'systems/new', component: NewSystemComponent },
  { path: 'system/:sysId/teams', component: TeamsComponent },
  { path: 'system/:sysId/teams/edit/:id', component: EditTeamComponent },
  { path: 'system/:sysId/teams/new', component: AddTeamComponent },
  { path: 'system/:sysId/members', component: MembersComponent },
  { path: 'system/:sysId/members/edit/:id', component: EditMemberComponent },
  { path: 'system/:sysId/members/new', component: AddMemberComponent },
  { path: 'system/:sysId/microservices', component: MicroservicesComponent },
  { path: 'system/:sysId/microservices/edit/:id', component: EditMicroserviceComponent },
  { path: 'system/:sysId/microservices/details/:id', component: ViewMicroserviceComponent },
  { path: 'system/:sysId/microservices/new', component: AddMicroserviceComponent },
  { path: 'system/:sysId/stories', component: ServiceStoriesComponent },
  { path: 'system/:sysId/stories/edit/:id', component: EditStoryComponent },
  { path: 'system/:sysId/stories/new', component: AddStoryComponent },
  { path: 'system/:sysId/modelartifacts', component: ModelArtifactsComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }