import { Microservice } from "./microservice.model";
import { Organization } from "./organization.model";

export interface Team {
    id: number;
    name: string;
    organization: Organization;
    microservices?: Set<Microservice>;
}

export interface TeamDTO {
    readonly id: number;
    name: string;
    organization: number;
}