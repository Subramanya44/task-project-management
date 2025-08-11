import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    <div class="grid grid-cols-3 gap-4">
      <div class="card">
        <h4 class="font-bold mb-2">To Do</h4>
        <div cdkDropList [cdkDropListData]="todo" (cdkDropListDropped)="drop($event,'todo')">
          <div *ngFor="let t of todo" cdkDrag class="p-2 border mb-2 rounded">{{t.title}}</div>
        </div>
      </div>
      <div class="card">
        <h4 class="font-bold mb-2">In Progress</h4>
        <div cdkDropList [cdkDropListData]="inprogress" (cdkDropListDropped)="drop($event,'inprogress')">
          <div *ngFor="let t of inprogress" cdkDrag class="p-2 border mb-2 rounded">{{t.title}}</div>
        </div>
      </div>
      <div class="card">
        <h4 class="font-bold mb-2">Done</h4>
        <div cdkDropList [cdkDropListData]="done" (cdkDropListDropped)="drop($event,'done')">
          <div *ngFor="let t of done" cdkDrag class="p-2 border mb-2 rounded">{{t.title}}</div>
        </div>
      </div>
    </div>
  `
})
export class TaskBoardComponent {
  todo = []; inprogress = []; done = [];
  constructor(private ts: TaskService){
    this.reload();
  }
  reload(){ const all = this.ts.tasks(); this.todo = all.filter((x:any)=>x.status==='todo'); this.inprogress = all.filter((x:any)=>x.status==='inprogress'); this.done = all.filter((x:any)=>x.status==='done'); }
  drop(e: CdkDragDrop<any[]>, status: Task['status']) {
    if (e.previousContainer === e.container) {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
    } else {
      transferArrayItem(e.previousContainer.data, e.container.data, e.previousIndex, e.currentIndex);
    }
    // update statuses of items moved
    e.container.data.forEach((t: any) => {
      t.status = status;
      this.ts.update(t.id, { status: status });
    });
  }
}
