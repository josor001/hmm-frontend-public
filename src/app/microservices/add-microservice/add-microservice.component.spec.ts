import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMicroserviceComponent } from './add-microservice.component';

describe('AddMicroserviceComponent', () => {
  let component: AddMicroserviceComponent;
  let fixture: ComponentFixture<AddMicroserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMicroserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMicroserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
