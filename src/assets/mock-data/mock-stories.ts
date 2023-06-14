import { ServiceStory } from "src/app/shared/models/servicestory.model";

export const STORIES: ServiceStory[] = [
    {
        name: "Story One",
        description: "This is the first story",
        vertexIds: [1, 2, 3],
        directedEdgeIds: [4, 5, 6],
        sysId: 1,
        id: 1,
    },
    {
        name: "Story Two",
        description: "This is the second story",
        vertexIds: [3, 1, 4],
        directedEdgeIds: [7, 8, 9],
        sysId: 1,
        id: 2,
    },
    {
        name: "Story Three",
        description: "This is the third story",
        vertexIds: [1, 2, 3, 4],
        directedEdgeIds: [10, 11, 12],
        sysId: 1,
        id: 3,
    },
];