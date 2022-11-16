import { TestBed } from '@angular/core/testing';

import { SoftwaresystemService } from './softwaresystem.service';

describe('SoftwaresystemService', () => {
  let service: SoftwaresystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwaresystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
