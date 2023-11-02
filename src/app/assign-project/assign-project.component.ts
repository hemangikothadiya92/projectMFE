import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from '../services/project-data.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootReducerState, getData } from 'src/store/reducer';
import { ProjectDataAction } from '../../store/actions/project-action';
import { EmployeeProjectDataMapping, Project } from '../project.interface';

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

  /**
   * Angular life cycle hook
   */
  ngOnInit() {
    this.getProjectData();
    this.getEmployeeData();
    this.initialiseForm();
  }

  /**
   * Add project form initialise
   */
  initialiseForm() {
    this.assignProjectForm = this.fb.group({
      employeeId: [''],
      projectId: ['']
    })
  }

  /**
   * get the all project data
   */
  getProjectData() {
    this._projectDataService.getProjectData()
      .subscribe((projects: Project[]) => {
        this.projectData = projects;
      })
  }

  /**
   * get all employee data
   */
  getEmployeeData() {
    this._projectDataService.getEmployeeData()
      .subscribe((employee: any) => {
        this.employeeData = employee;
      })
  }

  /**
   * when use click on the 'Submit' button employee and project API call parallelly.
   */
  onSubmit() {
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
        this.employeeProjectMapping(res);
      });
    this.assignProjectForm.reset();
  }

  /**
   * get the data with employeeprojectmapping and store in the NGRX Store
   * @param res 
   */
  employeeProjectMapping(res: any) {
   let employeeDetails: any[] = [];
    employeeDetails.push(res[0]);
    employeeDetails[0]["projectDetails"] = res[1];
    this._projectDataService.employeeIdProjectIdMapping(employeeDetails)
      .subscribe((data: EmployeeProjectDataMapping[]) => {
        this.store.dispatch(new ProjectDataAction({data}));
      });
      this.store.select(getData).subscribe((data: EmployeeProjectDataMapping[]) => {
        console.log('get data from store: ', data);
      })
  }

}
