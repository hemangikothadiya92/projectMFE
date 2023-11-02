import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmployeeProjectDataMapping, Project } from '../project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private _http: HttpClient) { }

  /**
   * POST call to add project data
   * @param payload 
   * @returns 
   */
  addProjectData(payload: Project): Observable<Project[]> {
    return this._http.post<Project[]>('http://localhost:3000/project', payload);
  }

  /**
   * GET call to get all the project data
   * @returns 
   */
  getProjectData() {
    return this._http.get<Project[]>('http://localhost:3000/project');
  }

  /**
   * Get call to get all the employee data
   * @returns 
   */
  getEmployeeData() {
    return this._http.get('http://localhost:3000/employee')
    .pipe(
      map((employee: any) => employee.filter((employee: any) => employee.active))
    )
  }

  /**
   * Get employee data by id
   * @param id employeeid
   * @returns 
   */
  getEmployeeDataById(id: number) {
    return this._http.get(`http://localhost:3000/employee/${id}`);
  }

  /**
   * Get project data by id
   * @param id projectid
   * @returns 
   */
  getProjectDataById(id: number) {
    return this._http.get(`http://localhost:3000/project/${id}`);
  }

  /**
   * POST call to store employee project mapping data
   * @param payload 
   * @returns 
   */
  employeeIdProjectIdMapping(payload: EmployeeProjectDataMapping[]) {
    return this._http.post<EmployeeProjectDataMapping[]>('http://localhost:3000/employeeprojectdatamapping', payload);
  }
}
