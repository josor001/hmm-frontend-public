import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStoriesComponent } from './widget-stories.component';

describe('WidgetStoriesComponent', () => {
  let component: WidgetStoriesComponent;
  let fixture: ComponentFixture<WidgetStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
