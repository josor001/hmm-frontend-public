import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModelArtifactService } from './modelartifact.service';
import { ModelArtifact } from '../models/modelartifact.model';
import { environment } from 'src/environments/environment';

describe('ModelArtifactService', () => {
  let service: ModelArtifactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ModelArtifactService ]
    });
    service = TestBed.inject(ModelArtifactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a specific ModelArtifact by its ID', () => {
    const mockModelArtifact: ModelArtifact = {
      id: 1,
      name: 'Mock Model Artifact',
      kind: 'Mock Kind',
      location: 'Mock Location',
      microserviceId: 123
    };

    service.getModelArtifact(1).subscribe((modelArtifact) => {
      expect(modelArtifact).toEqual(mockModelArtifact);
    });

    const request = httpMock.expectOne(`${environment.serverUrl}/artifacts/1`);
    expect(request.request.method).toBe('GET');
    request.flush(mockModelArtifact);
  });

  it('should retrieve all ModelArtifacts', () => {
    const mockModelArtifacts: ModelArtifact[] = [
      {
        id: 1,
        name: 'Mock Model Artifact 1',
        kind: 'Mock Kind 1',
        location: 'Mock Location 1',
        microserviceId: 123
      },
      {
        id: 2,
        name: 'Mock Model Artifact 2',
        kind: 'Mock Kind 2',
        location: 'Mock Location 2',
        microserviceId: 456
      }
    ];

    service.getModelArtifacts().subscribe((modelArtifacts) => {
      expect(modelArtifacts).toEqual(mockModelArtifacts);
    });

    const request = httpMock.expectOne(`${environment.serverUrl}/artifacts`);
    expect(request.request.method).toBe('GET');
    request.flush(mockModelArtifacts);
  });

  it('should create a new ModelArtifact', () => {
    const mockModelArtifact: ModelArtifact = {
      id: 1,
      name: 'Mock Model Artifact',
      kind: 'Mock Kind',
      location: 'Mock Location',
      microserviceId: 123
    };

    service.createModelArtifact(mockModelArtifact.name!!).subscribe((modelArtifact) => {
      expect(modelArtifact).toEqual(mockModelArtifact);
    });

    const request = httpMock.expectOne(`${environment.serverUrl}/artifacts`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockModelArtifact.name);
    request.flush(mockModelArtifact);
  });
  it('should update a model artifact', () => {
    const mockArtifact: ModelArtifact = { name: 'Test Artifact', kind: 'Test Kind', location: 'Test Location', microserviceId: 1, id: 1 };
    service.updateModelArtifact(mockArtifact).subscribe(updatedArtifact => {
      expect(updatedArtifact).toEqual(mockArtifact);
    });
    const req = httpMock.expectOne(`${service['entityUrl']}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockArtifact);
    req.flush(mockArtifact);
  });

  it('should delete a model artifact', () => {
    const mockId = 1;
    service.deleteModelArtifact(mockId).subscribe(result => {
      expect(result).toBeTruthy();
    });
    const req = httpMock.expectOne(`${service['entityUrl']}/${mockId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should handle errors', () => {
    const mockError = { status: 500, statusText: 'Server Error' };
    service.updateModelArtifact({}).subscribe(() => {}, error => {
      expect(error.message).toBe('Something bad happened; please try again later.');
    });
    const req = httpMock.expectOne(`${service['entityUrl']}`);
    expect(req.request.method).toBe('PUT');
    req.flush('Invalid request', mockError);
  });
});