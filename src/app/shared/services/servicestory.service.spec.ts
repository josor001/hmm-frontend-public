import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceStoryService } from './servicestory.service';
import { ServiceStory } from '../models/servicestory.model';
import { environment } from 'src/environments/environment';

describe('ServiceStoryService', () => {
  let service: ServiceStoryService;
  let httpMock: HttpTestingController;
  const storiesUrl = `${environment.serverUrl}/stories`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceStoryService]
    });
    service = TestBed.inject(ServiceStoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrganization', () => {
    it('should return an observable of a ServiceStory when called with an ID', () => {
      const id = 1;
      const mockStory: ServiceStory = {
        id: id,
        name: 'mockStory',
        description: 'This is a mock story'
      };

      service.getServiceStory(id).subscribe((story: ServiceStory) => {
        expect(story).toEqual(mockStory);
      });

      const req = httpMock.expectOne(`${storiesUrl}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockStory);
    });
  });

  describe('getServiceStories', () => {
    it('should return an observable of an array of ServiceStorys when called', () => {
      const mockStories: ServiceStory[] = [
        {id: 1, sysId: 1, name: 'mockStory1'},
        {id: 2, sysId: 1, name: 'mockStory2'}
      ];

      service.getServiceStories(1).subscribe((stories: ServiceStory[]) => {
        expect(stories).toEqual(mockStories);
      });

      const req = httpMock.expectOne(storiesUrl+'?sysId=1');
      expect(req.request.method).toBe('GET');
      req.flush(mockStories);
    });
  });

  describe('createServiceStory', () => {
    it('should return an observable of a new ServiceStory when called with a name', () => {
      const name = 'newStory';
      const mockStory: ServiceStory = {id: 1, sysId: 1, name: name};

      service.createServiceStory(name, 1).subscribe((story: ServiceStory) => {
        expect(story).toEqual(mockStory);
      });

      const req = httpMock.expectOne(storiesUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockStory);
    });
  });

  describe('updateServiceStory', () => {
    it('should return an observable of an updated ServiceStory when called with a ServiceStory', () => {
      const mockStory: ServiceStory = {id: 1, sysId: 1, name: 'mockStory'};

      service.updateServiceStory(mockStory).subscribe((story: ServiceStory) => {
        expect(story).toEqual(mockStory);
      });

      const req = httpMock.expectOne(storiesUrl);
      expect(req.request.method).toBe('PUT');
      req.flush(mockStory);
    });
  });

  describe('addVertex', () => { 
    it('should add a vertex to a service story', () => {
      const storyId = 1;
      const vertexId = 2;
      const dummyStory: ServiceStory = { id: storyId };
      service.addVertex(storyId, vertexId).subscribe((story: ServiceStory) => {
        expect(story).toEqual(dummyStory);
      });
      const req = httpMock.expectOne(`${service['entityUrl']}/${storyId}/vertices`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(vertexId);
      req.flush(dummyStory);
    });
  });

  describe('removeVertex', () => { 
    it('should remove a vertex from a service story', () => {
      const storyId = 1;
      const vertexId = 2;

      service.removeVertex(storyId, vertexId).subscribe((res) => {
        expect(res).toBeTruthy();
      });
      const req = httpMock.expectOne(`${service['entityUrl']}/${storyId}/vertices/${vertexId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('addEdge', () => {   
    it('should add an edge to a service story', () => {
      const storyId = 1;
      const edgeId = 2;
      const dummyStory: ServiceStory = { id: storyId };
      service.addEdge(storyId, edgeId).subscribe((story: ServiceStory) => {
        expect(story).toEqual(dummyStory);
      });
      const req = httpMock.expectOne(`${service['entityUrl']}/${storyId}/edges`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(edgeId);
      req.flush(dummyStory);
    });
  });

  describe('removeEdge', () => { 
    it('should remove an edge from a service story', () => {
      const storyId = 1;
      const edgeId = 2;
      service.removeEdge(storyId, edgeId).subscribe((res) => {
        expect(res).toBeTruthy();
      });
      const req = httpMock.expectOne(`${service['entityUrl']}/${storyId}/edges/${edgeId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('deleteServiceStory', () => { 
    it('should delete a service story', () => {
      const storyId = 1;
      service.deleteServiceStory(storyId).subscribe((res: any) => {
        expect(res).toBeTruthy();
      });
      const req = httpMock.expectOne(`${service['entityUrl']}/${storyId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
   });
});