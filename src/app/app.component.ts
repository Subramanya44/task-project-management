import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent, ToastComponent],
  template: `
    <div class="app-shell">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Task & Project Dashboard</h1>
        
        <!-- Dark mode toggle button -->
        <button 
          (click)="toggleTheme()" 
          class="px-3 py-1 rounded border dark:bg-gray-800 dark:text-white"
        >
          {{ _isDark() ? '☀ Light Mode' : '🌙 Dark Mode' }}
        </button>
      </div>

      <router-outlet></router-outlet>
      <app-loader></app-loader>
      <app-toast></app-toast>
    </div>
  `
})
export class AppComponent {
  private isDark = signal(localStorage.getItem('theme') === 'dark');

  constructor() {
    // Apply saved theme on load
    if (this.isDark()) {
      document.documentElement.classList.add('dark');
    }
  }

  toggleTheme() {
    const next = !this.isDark();
    this.isDark.set(next);

    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  _isDark() {
    return this.isDark();
  }
}
