import {Component, OnDestroy, OnInit} from '@angular/core';
import {MicroserviceService} from "../../shared/services/microservice.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-widget-microservices',
    templateUrl: './widget-microservices.component.html',
    styleUrls: ['./widget-microservices.component.scss']
})
export class WidgetMicroservicesComponent implements OnInit, OnDestroy {
    numberOfServices: number = 0;
    sub: Subscription | undefined;

    constructor(private microserviceService: MicroserviceService) {
    }

    ngOnInit(): void {
        this.sub = this.microserviceService.getMicroservices().subscribe(services => {
            this.numberOfServices = services.length
        })
    }
    ngOnDestroy(): void {
        this.sub?.unsubscribe()
    }
}
