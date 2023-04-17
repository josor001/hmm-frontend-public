import {Microservice} from "../../app/shared/models/microservice.model";

export const MICROSERVICES: Microservice[] = [
    {
        name: "User Service",
        repositoryLink: "https://github.com/user-service",
        contactPersonId: 1,
        plannedFeatures: ["Authentication", "Profile Management"],
        modelIds: [1, 2],
        id: 1
    },
    {
        name: "Product Service",
        repositoryLink: "https://github.com/product-service",
        contactPersonId: 2,
        plannedFeatures: ["Inventory Management", "Order Tracking"],
        modelIds: [3, 4, 5],
        id: 2
    },
    {
        name: "Payment Service",
        repositoryLink: "https://github.com/payment-service",
        contactPersonId: 4,
        plannedFeatures: ["Credit Card Processing", "Refunds"],
        modelIds: [6],
        id: 3
    },
    {
        name: "Messaging Service",
        repositoryLink: "https://github.com/messaging-service",
        contactPersonId: 3,
        plannedFeatures: ["Email Notifications", "SMS Notifications"],
        modelIds: [7, 8],
        id: 4
    }
];


