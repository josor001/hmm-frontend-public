import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArtifactDialogComponent } from './view-artifact-dialog.component';

describe('ViewArtifactDialogComponent', () => {
  let component: ViewArtifactDialogComponent;
  let fixture: ComponentFixture<ViewArtifactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewArtifactDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewArtifactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
