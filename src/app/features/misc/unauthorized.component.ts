import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-md mx-auto text-center mt-10">
      <h2 class="text-2xl font-bold mb-4 text-red-600">Access Denied</h2>
      <p>You don’t have permission to view this page.</p>
    </div>
  `
})
export class UnauthorizedComponent {}
