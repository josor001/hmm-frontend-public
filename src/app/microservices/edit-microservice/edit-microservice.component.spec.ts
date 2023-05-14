import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMicroserviceComponent } from './edit-microservice.component';

describe('EditServiceComponent', () => {
  let component: EditMicroserviceComponent;
  let fixture: ComponentFixture<EditMicroserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMicroserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMicroserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
