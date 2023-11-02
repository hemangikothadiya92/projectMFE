import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectDataService } from './project-data.service';

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
});
