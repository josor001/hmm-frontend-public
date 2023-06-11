import {Member} from "./member.model";
import {Microservice} from "./microservice.model";

export class CompleteTeam {
    name: string;
    ownedMicroservices: Microservice[] = [];
    members: Member[] = [];
    sysId: number;
    id: number;
    constructor(name: string, id: number, sysId: number) {
        this.name = name;
        this.id = id;
        this.sysId = sysId;
    }
}