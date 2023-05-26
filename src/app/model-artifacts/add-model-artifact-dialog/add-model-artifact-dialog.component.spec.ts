import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelArtifactDialogComponent } from './add-model-artifact-dialog.component';

describe('AddModelArtifactComponent', () => {
  let component: AddModelArtifactDialogComponent;
  let fixture: ComponentFixture<AddModelArtifactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModelArtifactDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModelArtifactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
