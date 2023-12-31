import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MicroserviceService} from "../../shared/services/microservice.service";
import {Subscription} from "rxjs";
import {Microservice} from "../../shared/models/microservice.model";

@Component({
    selector: 'app-widget-microservices',
    templateUrl: './widget-microservices.component.html',
    styleUrls: ['./widget-microservices.component.scss']
})
export class WidgetMicroservicesComponent implements OnInit, OnDestroy {
    numberOfServices: number = 0;
    microservices: Microservice[] = [];
    sub: Subscription | undefined;
    @Input() sysId: number = 0;
    constructor(private microserviceService: MicroserviceService) {
    }

    ngOnInit(): void {
        this.sub = this.microserviceService.getMicroservices(this.sysId).subscribe(services => {
            this.numberOfServices = services.length;
            this.microservices = services;
        })
    }
    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
