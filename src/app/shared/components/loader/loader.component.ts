import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `<div *ngIf="loader.loading()" class="fixed inset-0 flex items-center justify-center"><div class="p-4 bg-white dark:bg-[#021020] rounded shadow">Loading...</div></div>`
})
export class LoaderComponent {
  constructor(public loader: LoaderService){}
}
