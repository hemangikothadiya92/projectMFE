import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
import { ProjectDataService } from '../services/project-data.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let projectDataService: jasmine.SpyObj<ProjectDataService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const projectDataServiceSpy = jasmine.createSpyObj('ProjectDataService', ['addProjectData']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [ AddProjectComponent ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        ProjectDataService,
        { provide: Router, useValue: routerSpy },
      ],
    })

    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    projectDataService = TestBed.inject(ProjectDataService) as jasmine.SpyObj<ProjectDataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    spyOn(projectDataService, 'addProjectData').and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    const form = component.addProjectForm;

    expect(form.get('projectId')?.value).toBe('');
    expect(form.get('projectName')?.value).toBe('');
    expect(form.get('projectDescription')?.value).toBe('');
  });

  it('should call onSubmitProjectData() and add project data', () => {
    const projectData = {
      projectId: '123',
      projectName: 'Sample Project',
      projectDescription: 'This is a test project.',
    };

    component.ngOnInit();
    const form = component.addProjectForm;
    form.setValue(projectData);

    component.onSubmitProjectData();

    expect(projectDataService.addProjectData).toHaveBeenCalledWith(projectData);
  });
});
