import { TestBed } from '@angular/core/testing';

import { ServicestoryService } from './servicestory.service';

describe('ServicestoryService', () => {
  let service: ServicestoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicestoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
