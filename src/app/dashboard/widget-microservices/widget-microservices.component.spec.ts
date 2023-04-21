import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetMicroservicesComponent } from './widget-microservices.component';

describe('WidgetMicroservicesComponent', () => {
  let component: WidgetMicroservicesComponent;
  let fixture: ComponentFixture<WidgetMicroservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetMicroservicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetMicroservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
