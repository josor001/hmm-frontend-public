import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TeamsComponent} from "./teams/teams.component";
import {MicroservicesComponent} from "./microservices/microservices.component";
import {OrganizationComponent} from "./organization/organization.component";
import {SystemComponent} from "./system/system.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'system', component: SystemComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'microservices', component: MicroservicesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }