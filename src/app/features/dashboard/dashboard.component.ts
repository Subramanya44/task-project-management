import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div>
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div class="card">Projects: {{ projects.length }}</div>
        <div class="card">Tasks: {{ tasks.length }}</div>
        <div class="card">Completed: {{ completedCount }}</div>
        <div class="card">Pending: {{ pendingCount }}</div>
      </div>
      <div>
        <a routerLink="/projects" class="px-3 py-1 border rounded">Manage Projects</a>
        <a routerLink="/tasks" class="px-3 py-1 border rounded ml-2">Task Board</a>
      </div>
    </div>
  `
})
export class DashboardComponent {
  projects: any[] = [];
  tasks: any[] = [];

  get completedCount() {
    return this.tasks.filter(t => t.status === 'done').length;
  }
  
  get pendingCount() {
    return this.tasks.filter(t => t.status !== 'done').length;
  }

  constructor(private ps: ProjectService, private ts: TaskService) {
    this.ps.list().subscribe(projects => this.projects = projects);
    this.ts.listByProject(0).subscribe(tasks => this.tasks = tasks);
  }
}
