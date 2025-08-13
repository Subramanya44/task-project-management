import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private _data: Task[] = [
    { id: 1, projectId: 1, title: 'Design UI', status: 'todo' },
    { id: 2, projectId: 1, title: 'APIs ', status: 'inprogress' },
    { id: 3, projectId: 1, title: 'API Integration', status: 'inprogress' },
    { id: 4, projectId: 1, title: 'tests', status: 'done' },
    { id: 5, projectId: 1, title: 'Write tests', status: 'done' },
    { id: 6, projectId: 2, title: 'Set up DB', status: 'todo' }
  ];

  public tasks = signal<Task[]>(this._data);

  listByProject(projectId: number) {
    return of(this.tasks().filter(t => t.projectId === projectId)).pipe(delay(200));
  }

  add(task: Task) {
    task.id = Date.now();
    this._data.push(task);
    this.tasks.set(this._data);
    return of(task).pipe(delay(200));
  }

  update(id: number, patch: Partial<Task>) {
    const idx = this._data.findIndex(t => t.id === id);
    if (idx > -1) {
      this._data[idx] = { ...this._data[idx], ...patch };
      this.tasks.set(this._data);
    }
    return of(this._data.find(t => t.id === id) || null).pipe(delay(200));
  }

  delete(id: number) {
    this._data = this._data.filter(t => t.id !== id);
    this.tasks.set(this._data);
    return of(true).pipe(delay(200));
  }
}
