import {Team} from "../../app/shared/models/team.model";

export const TEAMS: Team[] = [
    {name: "Sales", ownedMicroserviceIds: [1, 2], memberIds: [1, 2], id: 1},
    {name: "Engineering", ownedMicroserviceIds: [3], memberIds: [3, 4], id: 2},
    {name: "Product Management", ownedMicroserviceIds: [2, 4], memberIds: [], id: 3},
    {name: "Finance", ownedMicroserviceIds: [6], memberIds: [1], id: 4},
    {name: "Marketing", ownedMicroserviceIds: [], memberIds: [], id: 5},
    {name: "Operations", ownedMicroserviceIds: [7, 8], memberIds: [3, 1], id: 6}
];