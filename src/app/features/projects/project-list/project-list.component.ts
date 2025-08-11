import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../core/services/project.service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent, FormsModule],
  template: `
    <div class="card">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-bold">Projects</h3>
        <div><button (click)="add()" class="px-3 py-1 bg-green-600 text-white rounded">New</button></div>
      </div>
      <div class="mb-3"><input [(ngModel)]="q" placeholder="Search" class="w-full p-2 border rounded" (input)="search()" /></div>
      <ul>
        <li *ngFor="let p of data" class="border-b py-2 flex justify-between items-center">
          <div>
            <div class="font-semibold">{{p.name}}</div>
            <div class="text-sm text-gray-500">{{p.description}}</div>
          </div>
          <div class="space-x-2">
            <button (click)="edit(p.id)" class="px-2 py-1 border rounded">Edit</button>
            <button (click)="remove(p.id)" class="px-2 py-1 border rounded">Delete</button>
          </div>
        </li>
      </ul>
      <div class="mt-3"><app-pagination [totalItems]="total" [itemsPerPage]="pageSize" (pageChange)="onPage($event)"></app-pagination></div>
    </div>
  `
})
export class ProjectListComponent {
  data:any[] = [];
  all:any[] = [];
  q = '';
  page = 1;
  pageSize = 5;
  total = 0;
  constructor(private ps: ProjectService, private router: Router, private toast: ToastService){
    this.load();
  }
  load(){
    this.ps.list().subscribe(d => { this.all = d; this.total = d.length; this.apply(); });
  }
  apply(){
    const filtered = this.all.filter(p => p.name.toLowerCase().includes(this.q.toLowerCase()));
    this.data = filtered.slice((this.page-1)*this.pageSize, this.page*this.pageSize);
    this.total = filtered.length;
  }
  search(){ this.page = 1; this.apply(); }
  onPage(p:number){ this.page = p; this.apply(); }
  add(){ this.router.navigate(['/projects/new']); }
  edit(id:number){ this.router.navigate(['/projects/edit', id]); }
  remove(id:number){ if(confirm('Delete?')){ this.ps.delete(id).subscribe(()=>{ this.toast.push('Deleted'); this.load(); }); } }
}
