import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTeamsComponent } from './widget-teams.component';

describe('WidgetTeamsComponent', () => {
  let component: WidgetTeamsComponent;
  let fixture: ComponentFixture<WidgetTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
