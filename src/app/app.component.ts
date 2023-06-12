import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Holistic Microservice Management Platform';
  routerSub: Subscription | undefined;
  sysId: number = 1;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay()
      );
  private routerSysSub: any;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.routerSysSub?.unsubscribe();
  }

  ngOnInit(): void {
  }

  forwardToDashboard() {
    let currentUrl = `/system/${this.sysId}/dashboard`;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
