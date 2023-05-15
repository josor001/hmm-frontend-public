export interface Microservice { 
    name?: string;
    purpose?: string;
    repositoryLink?: string;
    contactPersonId?: number;
    plannedFeatures?: Map<string, string>;
    modelIds?: Array<number>;
    sysId?: number;
    id?: number;
}
