import {ServiceStoryEdge} from "../../app/shared/models/servicestoryedge.model";

export const STORIES_EDGES: ServiceStoryEdge[] = [
    {
        sourceId: 1,
        targetId: 2,
        description: "This is the first edge1",
        id: 4,
    },
    {
        sourceId: 1,
        targetId: 3,
        description: "This is the first edge2",
        id: 5,
    },
    {
        sourceId: 3,
        targetId: 2,
        description: "This is the first edge3",
        id: 6,
    },
    {
        sourceId: 3,
        targetId: 1,
        description: "This is the second edge",
        id: 7,
    },
    {
        sourceId: 1,
        targetId: 4,
        description: "This is the third edge",
        id: 8,
    },
    {
        sourceId: 4,
        targetId: 3,
        description: "This is the fourth edge",
        id: 9,
    },
    {
        sourceId: 1,
        targetId: 2,
        description: "this",
        id: 10,
    },
    {
        sourceId: 2,
        targetId: 3,
        description: "is a",
        id: 11,
    },
    {
        sourceId: 3,
        targetId: 4,
        description: "chain",
        id: 12,
    },
];