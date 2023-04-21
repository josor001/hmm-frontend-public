import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    routerSub: Subscription | undefined;
    sysId: number = 0;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    }


    ngOnDestroy(): void {
        this.routerSub?.unsubscribe();
    }

    ngOnInit(): void {
        this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
            this.sysId = parseInt(<string>params.get('sysId'))
        });
    }

    forward(target:string) {
        this.router.navigate(['system',this.sysId,target])
    }
}
