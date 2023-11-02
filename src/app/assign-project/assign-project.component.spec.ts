import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProjectComponent } from './assign-project.component';
import { ProjectDataService } from '../services/project-data.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';


describe('AssignProjectComponent', () => {
  let component: AssignProjectComponent;
  let fixture: ComponentFixture<AssignProjectComponent>;
  let projectDataService: jasmine.SpyObj<ProjectDataService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const projectDataServiceSpy = jasmine.createSpyObj('ProjectDataService', [
      'getProjectData',
      'getEmployeeData',
      'getEmployeeDataById',
      'getProjectDataById',
      'employeeProjectMapping',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ AssignProjectComponent ],
      imports: [ReactiveFormsModule, MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatInputModule,
        HttpClientModule,
        RouterModule,
        MatTableModule,
        MatSelectModule],
      providers: [
        { provide: ProjectDataService, useValue: projectDataServiceSpy },
        { provide: FormBuilder, useValue: new FormBuilder() },
        
      ],
    })

    fixture = TestBed.createComponent(AssignProjectComponent);
    component = fixture.componentInstance;
    projectDataService = TestBed.inject(ProjectDataService) as jasmine.SpyObj<ProjectDataService>;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.initialiseForm();
    const form = component.assignProjectForm;

    expect(form.get('employeeId')?.value).toBe('');
    expect(form.get('projectId')?.value).toBe('');
  });

  it('should call getProjectData and getEmployeeData on ngOnInit', () => {
    const mockProjectData = [{ projectId: 1, projectName: 'Project 1', projectDescription: 'Description 1' }];
    const mockEmployeeData = [{ employeeId: 1, employeeName: 'Employee 1' }];

    //projectDataService.getProjectData.and.returnValue(of(mockProjectData));
    projectDataService.getEmployeeData.and.returnValue(of(mockEmployeeData));

    component.ngOnInit();

    expect(projectDataService.getProjectData).toHaveBeenCalled();
    expect(projectDataService.getEmployeeData).toHaveBeenCalled();
    expect(component.projectData).toEqual(mockProjectData);
    expect(component.employeeData).toEqual(mockEmployeeData);
  });


});
