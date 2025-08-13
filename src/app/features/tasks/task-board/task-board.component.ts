import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  styles: [`
    .drop-zone {
      min-height: 200px;
      background: #f3f4f6;
      padding: 8px;
      border-radius: 6px;
    }
    .empty-placeholder {
      color: #888;
      font-style: italic;
      padding: 10px;
      text-align: center;
    }
  `],
  template: `
    <div class="grid grid-cols-3 gap-4">
      <!-- To Do -->
      <div class="card">
        <h4 class="font-bold mb-2">To Do</h4>
        <div cdkDropList 
            [cdkDropListData]="todo" 
            [cdkDropListConnectedTo]="['inprogressList', 'doneList']"
            (cdkDropListDropped)="drop($event, 'todo')"
            id="todoList"
            class="drop-zone">
          <div *ngIf="todo.length === 0" class="empty-placeholder">Drop here</div>
          <div *ngFor="let t of todo" cdkDrag class="p-2 border mb-2 rounded bg-white">{{t.title}}</div>
        </div>
      </div>

      <!-- In Progress -->
      <div class="card">
        <h4 class="font-bold mb-2">In Progress</h4>
        <div cdkDropList 
            [cdkDropListData]="inprogress" 
            [cdkDropListConnectedTo]="['todoList', 'doneList']"
            (cdkDropListDropped)="drop($event, 'inprogress')"
            id="inprogressList"
            class="drop-zone">
          <div *ngIf="inprogress.length === 0" class="empty-placeholder">Drop here</div>
          <div *ngFor="let t of inprogress" cdkDrag class="p-2 border mb-2 rounded bg-white">{{t.title}}</div>
        </div>
      </div>

      <!-- Done -->
      <div class="card">
        <h4 class="font-bold mb-2">Done</h4>
        <div cdkDropList 
            [cdkDropListData]="done" 
            [cdkDropListConnectedTo]="['todoList', 'inprogressList']"
            (cdkDropListDropped)="drop($event, 'done')"
            id="doneList"
            class="drop-zone">
          <div *ngIf="done.length === 0" class="empty-placeholder">Drop here</div>
          <div *ngFor="let t of done" cdkDrag class="p-2 border mb-2 rounded bg-white">{{t.title}}</div>
        </div>
      </div>
    </div>
  `
})
export class TaskBoardComponent {
  todo: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];

  constructor(private ts: TaskService) {
    this.reload();
  }

  reload() {
    const all = this.ts.tasks();
    this.todo = all.filter(x => x.status === 'todo');
    this.inprogress = all.filter(x => x.status === 'inprogress');
    this.done = all.filter(x => x.status === 'done');
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: Task['status']) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Update status only for moved task
    const movedTask = event.container.data[event.currentIndex];
    if (movedTask) {
      movedTask.status = newStatus;
      this.ts.update(movedTask.id, { status: newStatus });
    }
  }
}
