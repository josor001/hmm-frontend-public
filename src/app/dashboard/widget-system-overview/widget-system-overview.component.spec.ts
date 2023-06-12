import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSystemOverviewComponent } from './widget-system-overview.component';

describe('WidgetSystemOverviewComponent', () => {
  let component: WidgetSystemOverviewComponent;
  let fixture: ComponentFixture<WidgetSystemOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetSystemOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetSystemOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
