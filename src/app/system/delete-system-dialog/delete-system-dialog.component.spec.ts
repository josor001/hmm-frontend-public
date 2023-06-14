import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSystemDialogComponent } from './delete-system-dialog.component';

describe('DeleteSystemDialogComponent', () => {
  let component: DeleteSystemDialogComponent;
  let fixture: ComponentFixture<DeleteSystemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSystemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSystemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
