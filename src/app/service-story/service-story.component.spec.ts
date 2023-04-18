import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceStoryComponent } from './service-story.component';

describe('ServiceStoryComponent', () => {
  let component: ServiceStoryComponent;
  let fixture: ComponentFixture<ServiceStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
