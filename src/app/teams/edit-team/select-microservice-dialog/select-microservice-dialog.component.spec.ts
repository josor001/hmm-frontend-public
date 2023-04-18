import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMicroserviceDialogComponent } from './select-microservice-dialog.component';

describe('SelectMicroserviceDialogComponent', () => {
  let component: SelectMicroserviceDialogComponent;
  let fixture: ComponentFixture<SelectMicroserviceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMicroserviceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMicroserviceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
