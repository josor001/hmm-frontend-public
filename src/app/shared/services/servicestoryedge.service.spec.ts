import { TestBed } from '@angular/core/testing';

import { ServicestoryedgeService } from './servicestoryedge.service';

describe('ServicestoryedgeService', () => {
  let service: ServicestoryedgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicestoryedgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
