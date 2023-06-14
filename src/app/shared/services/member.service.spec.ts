
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member.model';
import { MemberService } from './member.service';

describe('MemberService', () => {
  let service: MemberService;
  let httpMock: HttpTestingController;
  const serverUrl = environment.serverUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberService],
    });
    service = TestBed.inject(MemberService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMember', () => {
    it('should return a member by id', () => {
      const memberId = 1;
      const expectedMember: Member = { id: 1, firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' };
      service.getMember(memberId).subscribe((member) => {
        expect(member).toEqual(expectedMember);
      });
      const req = httpMock.expectOne(`${serverUrl}/members/${memberId}`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedMember);
    });
  });

  describe('getMembers', () => {
    it('should return a list of members', () => {
      const expectedMembers: Member[] = [
        { id: 1, sysId: 1, firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' },
        { id: 2, sysId: 1, firstname: 'Jane', lastname: 'Doe', email: 'jane.doe@example.com' },
      ];
      service.getMembers(1).subscribe((members) => {
        expect(members).toEqual(expectedMembers);
      });
      const req = httpMock.expectOne(`${serverUrl}/members?sysId=1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedMembers);
    });
  });

  describe('createMember', () => {
    it('should create a new member', () => {
      const newMember: Member = { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', sysId: 1 };
      service.createMember('John', 'Doe', 'john.doe@example.com', 1).subscribe((member) => {
        expect(member).toEqual({ id: 1, ...newMember });
      });
      const req = httpMock.expectOne(`${serverUrl}/members`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newMember);
      req.flush({ id: 1, ...newMember });
    });
  });

  describe('updateMember', () => {
    it('should update an existing member', () => {
      const updatedMember: Member = { id: 1, sysId: 1, firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' };
      service.updateMember(updatedMember).subscribe((member) => {
        expect(member).toEqual(updatedMember);
      });
      const req = httpMock.expectOne(`${serverUrl}/members`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updatedMember);
      req.flush(updatedMember);
    });
  });

  describe('deleteMember', () => {
    it('should delete the member and return an Observable<unknown>', () => {
      service.deleteMember(1).subscribe(data => {
        expect(data).toBeTruthy();
      });
      const req = httpMock.expectOne(`${service['entityUrl']}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
