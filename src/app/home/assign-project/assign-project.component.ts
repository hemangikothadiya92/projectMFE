import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from '../services/project-data.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootReducerState, getData } from 'src/reducer';
import { ProjectDataAction } from 'src/actions/project-action';

@Component({
  selector: 'app-assign-project',
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.scss']
})
export class AssignProjectComponent implements OnInit {

  assignProjectForm!: FormGroup;
  selectedProjectId: any;
  selectedEmployeeId: any;
  projectData: any;
  employeeData: any;
  allEmployeeData: any;
  allProjectData: any;


  constructor(private _projectDataService: ProjectDataService, private fb: FormBuilder, private store: Store<RootReducerState>) { }

  ngOnInit() {
    this.getProjectData();
    this.getEmployeeData();
    this.initialiseForm();
  }

  initialiseForm() {
    this.assignProjectForm = this.fb.group({
      employeeId: [''],
      projectId: ['']
    })
  }

  getProjectData() {
    this._projectDataService.getProjectData()
      .subscribe((projects: any) => {
        console.log("project data: ", projects);
        this.projectData = projects;
      })
  }

  getEmployeeData() {
    this._projectDataService.getEmployeeData()
      .subscribe((employee: any) => {
        console.log('employee data: ', employee);
        this.employeeData = employee;
      })
  }

  onSubmit() {
    console.log("submitted form: ", this.assignProjectForm.value);
    const getEmployeeData =
      this._projectDataService.getEmployeeDataById(this.assignProjectForm.value.employeeId);
    const getProjectData = this._projectDataService.getProjectDataById(this.assignProjectForm.value.projectId);
    forkJoin([getEmployeeData, getProjectData])
      .pipe(
        catchError((error) => of(error))
      )
      .subscribe((res: any) => {
        [
          this.allEmployeeData,
          this.allProjectData
        ] = res;
        console.log('fork join res: ', res);
        this.employeeProjectMapping(res);
      });
    this.assignProjectForm.reset();
  }

  employeeProjectMapping(res: any) {
   let employeeDetails: any[] = [];
    employeeDetails.push(res[0]);
    employeeDetails[0]["projectDetails"] = res[1];
    this._projectDataService.employeeIdProjectIdMapping(employeeDetails)
      .subscribe((data: any) => {
        console.log("employee project mapping data: ", data);
        this.store.dispatch(new ProjectDataAction({data}));
      });
      this.store.select(getData).subscribe((data: any) => {
        console.log('get data from store: ', data);
      })
  }

}
