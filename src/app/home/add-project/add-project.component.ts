import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectDataService } from '../services/project-data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  addProjectForm!: FormGroup;
  constructor(private fb: FormBuilder, private _projectDataService: ProjectDataService, private _router: Router) { }

  ngOnInit() {
    this.addProjectForm = this.fb.group({
      projectId: [''],
      projectName: [''],
      projectDescription: ['']
    })
  }

  onSubmitProjectData() {
    this._projectDataService.addProjectData(this.addProjectForm.value)
      .subscribe({
        next: (value: any) => {
          console.log(`${value} project added sucessfully`);
          this._router.navigateByUrl('assign-project');
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }
}
