import { TestBed } from '@angular/core/testing';

import { ServiceStoryEdgeService } from './service-story-edge.service';

describe('ServicestoryedgeService', () => {
  let service: ServiceStoryEdgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceStoryEdgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
