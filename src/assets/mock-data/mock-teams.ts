import {Team} from "../../app/shared/models/team.model";

export const TEAMS: Team[] = [
    {name: "Sales", ownedMicroserviceIds: [1], memberIds: [1, 2], sysId: 1, id: 1},
    {name: "Engineering", ownedMicroserviceIds: [3, 4], memberIds: [3, 4], sysId: 1, id: 2},
    {name: "Product Management", ownedMicroserviceIds: [2], memberIds: [], sysId: 1, id: 3},
    {name: "Finance", ownedMicroserviceIds: [6], memberIds: [1], sysId: 1, id: 4},
    {name: "Marketing", ownedMicroserviceIds: [], memberIds: [], sysId: 1, id: 5},
    {name: "Operations", ownedMicroserviceIds: [7, 8], memberIds: [3, 1], sysId: 1, id: 6}
];