import {Microservice} from "../../app/shared/models/microservice.model";

export const MICROSERVICES: Microservice[] = [
    {
        name: "User Service",
        repositoryLink: "https://github.com/user-service",
        contactPersonId: 1,
        plannedFeatures: {"Authentication": "super desc of auth feature", "Profile Management": "super desc of profile feature"},
        id: 1
    },
    {
        name: "Product Service",
        repositoryLink: "https://github.com/product-service",
        contactPersonId: 2,
        plannedFeatures: {"Inventory Management": "super desc of inv management feature", "Order Tracking": "super desc of tracking feature"},
        id: 2
    },
    {
        name: "Payment Service",
        repositoryLink: "https://github.com/payment-service",
        contactPersonId: 4,
        plannedFeatures: {"Credit Card Processing": "super desc of credit card feature", "Refunds": "super desc of refund feature"},
        id: 3
    },
    {
        name: "Messaging Service",
        repositoryLink: "https://github.com/messaging-service",
        contactPersonId: 3,
        plannedFeatures: {"Email Notifications": "super desc of mail notifications feature", "SMS Notifications": "super desc of sms notification feature"},
        id: 4
    }
];


