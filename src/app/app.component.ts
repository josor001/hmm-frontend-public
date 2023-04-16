import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {SoftwaresystemService} from "./shared/services/softwaresystem.service";
import {Softwaresystem} from "./shared/models/softwaresystem.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Holistic Microservice Management Platform';
  systems: Softwaresystem[] = []
  selectedSystem: Softwaresystem = {};

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay()
      );

  constructor(private breakpointObserver: BreakpointObserver, private systemService: SoftwaresystemService) {}

  getSoftwaresystems(): void {
    this.systemService.getSoftwaresystems().subscribe(systems => this.systems = systems);
  }

  onSelect(system: Softwaresystem): void {
    this.selectedSystem = system;
  }

  ngOnInit(): void {
    this.getSoftwaresystems();
    this.selectedSystem = this.systems.values().next().value
  }
}
