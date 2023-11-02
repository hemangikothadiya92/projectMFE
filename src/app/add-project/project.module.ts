import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProjectDataService } from '../services/project-data.service';
import { MatSelectModule } from '@angular/material/select';
import { AddProjectComponent } from './add-project.component';

const routes: Routes = [
  {
    path: '',
    component: AddProjectComponent
  }
];

@NgModule({
  declarations: [
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    MatSelectModule,
    RouterModule.forChild(routes),
  ],
  providers: [ProjectDataService],
  exports: [RouterModule]
})
export class ProjectModule { }
