import { Microservice } from "./microservice.model";
import { Modelkind } from "./modelkind.enum";

export interface Model {
    id: number;
    name: string;
    kind: Modelkind;
    microservice: Microservice;
}

export interface ModelDTO {
    readonly id: number;
    name: string;
    kind: String;
    microservice: number;
}