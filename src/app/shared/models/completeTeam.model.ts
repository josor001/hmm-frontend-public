import {Member} from "./member.model";
import {Microservice} from "./microservice.model";

export class CompleteTeam {
    name: string;
    ownedMicroservices: Microservice[] = [];
    members: Member[] = [];
    id: number;
    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}