import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMicroserviceComponent } from './view-microservice.component';

describe('ViewMicroserviceComponent', () => {
  let component: ViewMicroserviceComponent;
  let fixture: ComponentFixture<ViewMicroserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMicroserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMicroserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
