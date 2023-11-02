import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectDataService } from './project-data.service';
import { EmployeeProjectDataMapping } from '../project.interface';

describe('ProjectDataService', () => {
  let service: ProjectDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectDataService],
    });
    service = TestBed.inject(ProjectDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send an HTTP POST request to add project data', () => {
    const projectData = {
      projectName: 'Test',
      projectDescription: 'Testing'
    };

    service.addProjectData(projectData).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/project');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });

    httpTestingController.verify();
  });

  it('should send an HTTP GET request to retrieve project data', () => {
    const mockProjectData = [
      {
        "projectId": "",
        "projectName": "test",
        "projectDescription": "testing",
        "id": 11
      },
    ];

    service.getProjectData().subscribe((projectData: any) => {
      expect(projectData).toEqual(mockProjectData);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/project');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjectData);

    httpTestingController.verify();
  });

  it('should get employee data by id', () => {
    const employeeId = 1;
    const expectedEmployeeData = { id: 1, name: 'John Doe' };

    service.getEmployeeDataById(employeeId).subscribe((data) => {
      expect(data).toEqual(expectedEmployeeData);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/employee/${employeeId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedEmployeeData);

    httpTestingController.verify();
  });

  it('should get project data by id', () => {
    const projectId = 1;
    const expectedProjectData = { id: 1, name: 'Sample Project' };

    service.getProjectDataById(projectId).subscribe((data) => {
      expect(data).toEqual(expectedProjectData);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/project/${projectId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedProjectData);

    httpTestingController.verify();
  });

  it('should post employee project data mapping', () => {
    const payload: EmployeeProjectDataMapping[] = [{
      "employeeId": "",
      "firstName": "bren",
      "lastName": "stone",
      "email": "bren@yahoo.com",
      "mobile": "8877665542",
      "address": "strye street",
      "active": true,
      "id": 4,
      "projectDetails": {
        "id": 1,
        "projectId": "",
        "projectName": "Test",
        "projectDescription": "testing"
      }
    }];
    const expectedResponse = payload;

    service.employeeIdProjectIdMapping(payload).subscribe((data) => {
      expect(data).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/employeeprojectdatamapping');
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);

    httpTestingController.verify();
  });

  it('should get and filter active employees', () => {
    const mockEmployees = [
      { id: 1, name: 'Employee 1', active: true },
      { id: 2, name: 'Employee 2', active: false },
      { id: 3, name: 'Employee 3', active: true },
    ];

    service.getEmployeeData().subscribe((data) => {
      expect(data).toEqual(mockEmployees.filter((employee) => employee.active));
    });

    const req = httpTestingController.expectOne('http://localhost:3000/employee');
    expect(req.request.method).toEqual('GET');
    req.flush(mockEmployees);

    httpTestingController.verify();
  });

 


});
