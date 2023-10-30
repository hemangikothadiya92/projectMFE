import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  { path: 'project', loadChildren: () =>
      import('./add-project/project.module').then((module) => module.ProjectModule),
  },
  { path: 'assign-project', loadChildren: () =>
      import('./assign-project/assign-project.module').then((module) => module.AssignProjectModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
