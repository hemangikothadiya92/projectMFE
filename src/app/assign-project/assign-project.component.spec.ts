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
import { Project } from '../project.interface';
import { Store, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectDataAction } from 'src/store/actions/project-action';


describe('AssignProjectComponent', () => {
  let component: AssignProjectComponent;
  let fixture: ComponentFixture<AssignProjectComponent>;
  let projectDataService: jasmine.SpyObj<ProjectDataService>;
  let formBuilder: FormBuilder;
  let store: Store;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ AssignProjectComponent ],
      imports: [ReactiveFormsModule, MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatSlideToggleModule,
        MatInputModule,
        HttpClientModule,
        RouterModule,
        MatTableModule,
        StoreModule.forRoot({}),
        MatSelectModule],
      providers: [
        ProjectDataService,
        { provide: FormBuilder, useValue: new FormBuilder() },
        
      ],
    })

    fixture = TestBed.createComponent(AssignProjectComponent);
    component = fixture.componentInstance;
    projectDataService = TestBed.inject(ProjectDataService) as jasmine.SpyObj<ProjectDataService>;
    formBuilder = TestBed.inject(FormBuilder);
    store = TestBed.inject(Store);

    spyOn(projectDataService, 'getProjectData').and.returnValue(of([]));
    spyOn(projectDataService, 'getEmployeeData').and.returnValue(of([]));
    spyOn(projectDataService, 'getEmployeeDataById').and.returnValue(of({}));
    spyOn(projectDataService, 'getProjectDataById').and.returnValue(of({}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.initialiseForm();
    expect(component.assignProjectForm).toBeTruthy();
  });

  it('should get project data', () => {
    component.getProjectData();
    expect(projectDataService.getProjectData).toHaveBeenCalled();
  });

  it('should get employee data', () => {
    component.getEmployeeData();
    expect(projectDataService.getEmployeeData).toHaveBeenCalled();
  });

  it('should reset the form and call employeeProjectMapping on successful onSubmit', () => {
    const employeeId = 1;
    const projectId = 3;
    const employeeData = [{
      "employeeId": "",
      "firstName": "test",
      "lastName": "test123",
      "email": "jdd@mail.com",
      "mobile": "0987654321",
      "address": "test address",
      "active": true,
      "id": 1
    }];
    const projectData = [{
      "projectId": "",
      "projectName": "test",
      "projectDescription": "testing",
      "id": 3
    }];

    component.assignProjectForm.setValue({
      employeeId,
      projectId,
    });

    spyOn(component, 'employeeProjectMapping');

    component.onSubmit();

    expect(component.assignProjectForm.value.employeeId).toBe(null); 
    expect(component.assignProjectForm.value.projectId).toBe(null);

    expect(projectDataService.getEmployeeDataById).toHaveBeenCalledWith(employeeId);
    expect(projectDataService.getProjectDataById).toHaveBeenCalledWith(projectId);

  });

  xit('should call employeeProjectMapping and dispatch the correct action', () => {
    const res = [
      {
          "employeeId": "",
          "firstName": "bren",
          "lastName": "stone",
          "email": "bren@yahoo.com",
          "mobile": "8877665542",
          "address": "strye street",
          "active": true,
          "id": 4,
      },
      {
        "projectId": "",
        "projectName": "test123",
        "projectDescription": "testing1234",
        "id": 4
      }
    ];
    let employeeDetails: any[] = [];
    employeeDetails.push(res[0]);
    employeeDetails[0]['projectDetails'] = res[1];
    spyOn(projectDataService, 'employeeIdProjectIdMapping').and.returnValue(of(employeeDetails));
    spyOn(store, 'dispatch');
    component.employeeProjectMapping(employeeDetails);

    expect(projectDataService.employeeIdProjectIdMapping).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new ProjectDataAction({ data: employeeDetails }));
    
  });


});
