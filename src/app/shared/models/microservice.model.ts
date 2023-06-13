export interface Microservice {
    name?: string;
    purpose?: string;
    repositoryLink?: string;
    issueLink?: string;
    contactPersonId?: number;
    plannedFeatures?: Record<string,string>;
    sysId?: number;
    id?: number;
}
