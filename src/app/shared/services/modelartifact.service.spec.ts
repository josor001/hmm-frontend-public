import { TestBed } from '@angular/core/testing';

import { ModelArtifactService } from './modelartifact.service';

describe('ModelartifactService', () => {
  let service: ModelArtifactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelArtifactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
