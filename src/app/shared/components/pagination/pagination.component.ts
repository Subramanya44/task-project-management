import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-2">
      <button (click)="prev()" class="px-2 py-1 border rounded">Prev</button>
      <span>Page {{page}} / {{totalPages}}</span>
      <button (click)="next()" class="px-2 py-1 border rounded">Next</button>
    </div>
  `
})
export class PaginationComponent{
  @Input() totalItems = 0;
  @Input() itemsPerPage = 5;
  @Output() pageChange = new EventEmitter<number>();
  page = 1;
  get totalPages(){ return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage)); }
  prev(){ if(this.page>1){ this.page--; this.pageChange.emit(this.page); } }
  next(){ if(this.page < this.totalPages){ this.page++; this.pageChange.emit(this.page); } }
}
