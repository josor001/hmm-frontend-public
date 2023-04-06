import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrganizationService } from './organization.service';
import { Organization } from '../models/organization.model';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganizationService]
    });

    service = TestBed.inject(OrganizationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve an organization by id', () => {
    const id = 1;
    const mockOrga: Organization = { id: id, name: 'Test Organization' };

    service.getOrganization(id).subscribe(orga => {
      expect(orga).toEqual(mockOrga);
    });

    const req = httpMock.expectOne(`${service['entityUrl']}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrga);
  });

  it('should retrieve all organizations', () => {
    const mockOrganizations: Organization[] = [
      { id: 1, name: 'Orga 1' },
      { id: 2, name: 'Orga 2' }
    ];

    service.getOrganizations().subscribe(orgas => {
      expect(orgas.length).toBe(2);
      expect(orgas).toEqual(mockOrganizations);
    });

    const req = httpMock.expectOne(service['entityUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrganizations);
  });

  it('should create a new organization', () => {
    const mockOrga: Organization = { id: 1, name: 'Test Organization' };

    service.createOrganization('Test Organization').subscribe(orga => {
      expect(orga).toEqual(mockOrga);
    });

    const req = httpMock.expectOne(service['entityUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockOrga.name);
    req.flush(mockOrga);
  });

  it('should update an organization', () => {
    const mockOrga: Organization = { id: 1, name: 'Updated Test Organization' };

    service.updateOrganization(mockOrga).subscribe(orga => {
      expect(orga).toEqual(mockOrga);
    });

    const req = httpMock.expectOne(service['entityUrl']);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockOrga);
    req.flush(mockOrga);
  });

  it('should add a team to an organization', () => {
    const orgaId = 1;
    const teamId = 1;
    const mockOrga: Organization = { id: orgaId, name: 'Test Organization' };

    service.addTeam(orgaId, teamId).subscribe(orga => {
      expect(orga).toEqual(mockOrga);
    });

    const req = httpMock.expectOne(`${service['entityUrl']}/${orgaId}/teams`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(teamId);
    req.flush(mockOrga);
  });

  it('should remove a team from an organization', () => {
    const orgaId = 1;
    const teamId = 2;
    const mockOrga: Organization = { id: orgaId, name: 'Orga 1', teamIds: [1, 2, 3] };
  
    // Make the service call
    service.removeTeam(orgaId, teamId).subscribe((res) => {
        expect(res).toBeTruthy();
      }
    );

    // Mock HTTP response
    const req = httpMock.expectOne(`${service['entityUrl']}/${orgaId}/teams/${teamId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    //this does not check if returned org does or doesnt contain teamId 2!
  });
});