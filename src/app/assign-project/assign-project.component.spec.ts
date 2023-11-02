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

  // it('should handle form submission', () => {
  //   component.assignProjectForm.setValue({ employeeId: 1, projectId: 2 });

  //   spyOn(projectDataService, 'employeeIdProjectIdMapping').and.returnValue(of([]));
    

  //   component.onSubmit();

  //   expect(projectDataService.getEmployeeDataById).toHaveBeenCalledWith(1);
  //   expect(projectDataService.getProjectDataById).toHaveBeenCalledWith(2);


   
  // });


});
