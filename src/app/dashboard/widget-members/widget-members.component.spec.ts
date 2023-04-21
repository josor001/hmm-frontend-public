import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetMembersComponent } from './widget-members.component';

describe('WidgetMembersComponent', () => {
  let component: WidgetMembersComponent;
  let fixture: ComponentFixture<WidgetMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
