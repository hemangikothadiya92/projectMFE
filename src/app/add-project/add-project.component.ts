import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectDataService } from '../services/project-data.service';
import { Route, Router } from '@angular/router';
import { Project } from '../project.interface';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  addProjectForm!: FormGroup;
  constructor(private fb: FormBuilder, private _projectDataService: ProjectDataService, private _router: Router) { }

  /**
   * angular life cycle hook
   */
  ngOnInit() {
    this.addProjectForm = this.fb.group({
      projectId: [''],
      projectName: [''],
      projectDescription: ['']
    })
  }

  /**
   * when click on the 'Add Project' button user redirect to assign-project
   */
  onSubmitProjectData() {
    this._projectDataService.addProjectData(this.addProjectForm.value)
      .subscribe({
        next: (value: Project[]) => {
          this._router.navigateByUrl('assign-project');
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }
}
