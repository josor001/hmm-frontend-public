import {Microservice} from "../../app/shared/models/microservice.model";

export const MICROSERVICES: Microservice[] = [
    {
        name: "User Service",
        repositoryLink: "https://github.com/user-service",
        contactPersonId: 1,
        plannedFeatures: new Map<string, string>([["Authentication", "super desc of auth feature"], ["Profile Management", "super desc of profile feature"]]),
        modelIds: [1, 2],
        id: 1
    },
    {
        name: "Product Service",
        repositoryLink: "https://github.com/product-service",
        contactPersonId: 2,
        plannedFeatures: new Map<string, string>([["Inventory Management", "super desc of inv management feature"], ["Order Tracking", "super desc of tracking feature"]]),
        modelIds: [3, 4, 5],
        id: 2
    },
    {
        name: "Payment Service",
        repositoryLink: "https://github.com/payment-service",
        contactPersonId: 4,
        plannedFeatures: new Map<string, string>([["Credit Card Processing", "super desc of credit card feature"], ["Refunds", "super desc of refund feature"]]),
        modelIds: [6],
        id: 3
    },
    {
        name: "Messaging Service",
        repositoryLink: "https://github.com/messaging-service",
        contactPersonId: 3,
        plannedFeatures: new Map<string, string>([["Email Notifications", "super desc of mail notifications feature"], ["SMS Notifications", "super desc of sms notifications feature"]]),
        modelIds: [7, 8],
        id: 4
    }
];


