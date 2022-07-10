import { System } from "./system.model";
import { Team } from "./team.model";

export interface Organization {
    id: number;
    name: string;
    teams?: Set<Team>;
    system?: System;
}

export interface OrganizationDTO {
    readonly id: number;
    name: string;
    system: number;
}