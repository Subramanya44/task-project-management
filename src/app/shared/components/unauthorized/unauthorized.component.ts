import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-md mx-auto card text-center">
      <h2 class="text-xl font-bold text-red-600">Unauthorized</h2>
      <p class="mb-4">You do not have permission to view this page.</p>
      <a routerLink="/" class="px-4 py-2 bg-blue-600 text-white rounded">Go Home</a>
    </div>
  `
})
export class UnauthorizedComponent {}
