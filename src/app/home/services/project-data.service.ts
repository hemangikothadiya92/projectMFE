import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private _http: HttpClient) { }

  addProjectData(payload: any) {
    return this._http.post('http://localhost:3000/project', payload);
  }
}
