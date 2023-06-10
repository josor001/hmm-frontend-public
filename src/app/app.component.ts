import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Holistic Microservice Management Platform';
  routerSub: Subscription | undefined;
  sysId: number = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay()
      );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  protected readonly NaN = NaN;

  forwardToDashboard() {
    this.router.navigate([`/system/${this.sysId}/dashboard`]);
  }
}
