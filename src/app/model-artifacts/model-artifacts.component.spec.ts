import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelArtifactsComponent } from './model-artifacts.component';

describe('ModelArtifactsComponent', () => {
  let component: ModelArtifactsComponent;
  let fixture: ComponentFixture<ModelArtifactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelArtifactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelArtifactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
