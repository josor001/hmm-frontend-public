import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router} from "@angular/router";
import {SoftwaresystemService} from "./shared/services/softwaresystem.service";
import {Softwaresystem} from "./shared/models/softwaresystem.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Holistic Microservice Management Platform';
  routerSub: Subscription | undefined;
  sysId: number | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay()
      );
  private routerSysSub: Subscription | undefined;
  private sysSub: Subscription | undefined;
  systems: Softwaresystem[] = [];

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private systemService : SoftwaresystemService) {
  }

  ngOnDestroy(): void {
    this.routerSysSub?.unsubscribe();
    this.sysSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.sysSub = this.systemService.getSoftwaresystems().subscribe(systems => {
      this.systems = systems;
    })
  }

  forwardToDashboard() {
    let currentUrl = `/system/${this.sysId}/dashboard`;
    console.log(currentUrl);
    this.router.navigateByUrl('/systems/new', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
