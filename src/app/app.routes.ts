import { Routes } from '@angular/router';
import { ProjectsModule } from './features/projects/projects.module';
import { TasksModule } from './features/tasks/tasks.module';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      ),
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'projects',
    loadChildren: () => Promise.resolve(ProjectsModule),
    canActivate: [authGuard]
  },
  {
    path: 'tasks',
    loadChildren: () => Promise.resolve(TasksModule),
    canActivate: [authGuard]
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/components/unauthorized/unauthorized.component').then(
        m => m.UnauthorizedComponent
      )
  },
  { path: '**', redirectTo: '' }
];
