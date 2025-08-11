import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ProjectListComponent, canActivate: [authGuard], data: { roles: ['admin'] } },
  { path: 'new', component: ProjectFormComponent, canActivate: [authGuard], data: { roles: ['admin'] } },
  { path: 'edit/:id', component: ProjectFormComponent, canActivate: [authGuard], data: { roles: ['admin'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsModule {}


