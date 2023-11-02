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
import { AssignProjectComponent } from './assign-project.component';
import { ProjectDataService } from '../services/project-data.service';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from 'src/store/reducer';

const routes: Routes = [
  {
    path: '',
    component: AssignProjectComponent
  }
];

@NgModule({
  declarations: [
    AssignProjectComponent
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
    StoreModule.forRoot(rootReducer),
    RouterModule.forChild(routes),
  ],
  providers: [ProjectDataService],
  exports: [RouterModule]
})
export class AssignProjectModule { }
