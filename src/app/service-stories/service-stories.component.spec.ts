import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceStoriesComponent } from './service-stories.component';

describe('ServiceStoryComponent', () => {
  let component: ServiceStoriesComponent;
  let fixture: ComponentFixture<ServiceStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
