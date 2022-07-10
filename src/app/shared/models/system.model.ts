import { Microservice } from "./microservice.model";
import { Organization } from "./organization.model";

export interface System {
    id: number;
    name: string;
    organization: Organization;
    microservices: Set<Microservice>;
}

export interface SystemDTO {
    readonly id: number;
    name: string;
    organization: number;
}