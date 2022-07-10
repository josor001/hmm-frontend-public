import { Model } from "./model.model";
import { System } from "./system.model";
import { Team } from "./team.model";

export interface Microservice {
    id: number;
    name: string;
    models: Set<Model>;
    owner: Team;
    system: System;
    repository: URL;
}

export interface MicroserviceDTO {
    readonly id: number;
    name: string;
    owner: number;
    system: number;
    repository: URL;
}
