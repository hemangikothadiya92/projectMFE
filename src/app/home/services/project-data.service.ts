import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private _http: HttpClient) { }

  addProjectData(payload: any) {
    return this._http.post('http://localhost:3000/project', payload);
  }

  getProjectData() {
    return this._http.get('http://localhost:3000/project');
  }

  getEmployeeData() {
    return this._http.get('http://localhost:3000/employee')
    .pipe(
      map((employee: any) => employee.filter((employee: any) => employee.active))
    )
  }

  getEmployeeDataById(id: any) {
    return this._http.get(`http://localhost:3000/employee/${id}`);
  }

  getProjectDataById(id: any) {
    return this._http.get(`http://localhost:3000/project/${id}`);
  }

  employeeIdProjectIdMapping(payload: any) {
    return this._http.post('http://localhost:3000/employeeprojectdatamapping', payload);
  }
}
