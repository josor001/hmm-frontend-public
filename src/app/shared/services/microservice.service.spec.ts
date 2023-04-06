import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MicroserviceService } from './microservice.service';
import { Microservice } from '../models/microservice.model';

describe('MicroserviceService', () => {
  let service: MicroserviceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MicroserviceService]
    });
    service = TestBed.inject(MicroserviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a microservice by id', () => {
    const mockMicroservice: Microservice = { id: 1, name: 'Test Microservice' };
    service.getMicroservice(1).subscribe((microservice: Microservice) => {
      expect(microservice).toEqual(mockMicroservice);
    });
    const req = httpMock.expectOne(`${service['entityUrl']}/${mockMicroservice.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMicroservice);
  });

  it('should get all microservices', () => {
    const mockMicroservices: Microservice[] = [
      { id: 1, name: 'Test Microservice 1' },
      { id: 2, name: 'Test Microservice 2' }
    ];
    service.getMicroservices().subscribe((microservices: Microservice[]) => {
      expect(microservices.length).toBe(2);
      expect(microservices).toEqual(mockMicroservices);
    });
    const req = httpMock.expectOne(service['entityUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockMicroservices);
  });

  it('should create a microservice', () => {
    const mockMicroservice: Microservice = { id: 1, name: 'Test Microservice' };
    service.createMicroservice('Test Microservice').subscribe((microservice: Microservice) => {
      expect(microservice).toEqual(mockMicroservice);
    });
    const req = httpMock.expectOne(service['entityUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockMicroservice);
  });

  it('should update a microservice', () => {
    const mockMicroservice: Microservice = { id: 1, name: 'Test Microservice' };
    service.updateMicroservice(mockMicroservice).subscribe((microservice: Microservice) => {
      expect(microservice).toEqual(mockMicroservice);
    });
    const req = httpMock.expectOne(service['entityUrl']);
    expect(req.request.method).toBe('PUT');
    req.flush(mockMicroservice);
  });

  it('should add an artifact to a microservice', () => {
    const mockServiceId = 1;
    const mockArtifactId = 2;
    const mockMicroservice: Microservice = { id: mockServiceId, name: 'Test Microservice' };
    service.addModelArtifact(mockServiceId, mockArtifactId).subscribe((microservice: Microservice) => {
      expect(microservice).toEqual(mockMicroservice);
    });
    const req = httpMock.expectOne(`${service['entityUrl']}/${mockServiceId}/artifacts`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockMicroservice);
  });

  describe('removeModelArtifact', () => {
    it('should remove model artifact from microservice', () => {
      const serviceId = 1;
      const artifactId = 2;
      const mockMicroservice: Microservice = {
        id: serviceId,
        name: 'Test Service',
        modelIds: [artifactId],
      };
      const expectedResponse: Microservice = {
        id: serviceId,
        name: 'Test Service',
        modelIds: [],
      };

      service.removeModelArtifact(serviceId, artifactId).subscribe((data) => {
        expect(data).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(`${service['entityUrl']}/${serviceId}/artifacts/${artifactId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(expectedResponse);
    });
  });
});
