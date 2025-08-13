import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="max-w-md mx-auto card">
      <h2 class="text-xl font-bold mb-2">Login</h2>

      <form [formGroup]="f" (ngSubmit)="submit()">
        <!-- Email Field -->
        <div class="mb-2">
          <input
            formControlName="email"
            placeholder="Email"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Password Field -->
        <div class="mb-2">
          <input
            formControlName="password"
            type="password"
            placeholder="Password"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Submit & Navigation -->
        <div class="flex justify-between items-center">
          <button class="px-4 py-2 bg-blue-600 text-white rounded">
            Login
          </button>
          <a routerLink="/auth/register">Register</a>
        </div>
      </form>
    </div>
  `
})
export class LoginComponent {
 
  f = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    if (auth.currentUser()) {
      this.router.navigate(['/']);
    }
  }

  submit() {
    const { email, password } = this.f.value;

    this.auth.login(email, password).subscribe(user => {
      if (user) {
        this.toast.push('Logged in');
        if (user.role === 'admin') {
          this.router.navigate(['/projects']);
        } else {
          this.router.navigate(['/tasks']);
        }
      } else {
        this.toast.push('Invalid credentials');
      }
    });
  }
}
