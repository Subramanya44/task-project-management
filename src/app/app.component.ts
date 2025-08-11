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
    <div [class.dark]="_isDark()" class="app-shell">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Task & Project Dashboard</h1>
      </div>
      <router-outlet></router-outlet>
      <app-loader></app-loader>
      <app-toast></app-toast>
    </div>
  `
})
export class AppComponent {
  private isDark = signal(localStorage.getItem('theme') === 'dark');
  toggleTheme(){ const next = !this.isDark(); this.isDark.set(next); localStorage.setItem('theme', next ? 'dark' : ''); }
  _isDark(){ return this.isDark(); }
}
