import { TestBed } from '@angular/core/testing';

import { ModelartifactService } from './modelartifact.service';

describe('ModelartifactService', () => {
  let service: ModelartifactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelartifactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
