import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed right-4 bottom-4 space-y-2">
      <div *ngFor="let t of toasts.toasts()" class="p-3 rounded shadow bg-white dark:bg-[#042233]">
        {{t.message}}
      </div>
    </div>
  `
})
export class ToastComponent {
  constructor(public toasts: ToastService){}
}
