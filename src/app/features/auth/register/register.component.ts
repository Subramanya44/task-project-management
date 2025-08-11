import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-md mx-auto card">
      <h2 class="text-xl font-bold mb-2">Register</h2>
      <form [formGroup]="f" (ngSubmit)="submit()">
        <div class="mb-2"><input formControlName="name" placeholder="Name" class="w-full p-2 border rounded" /></div>
        <div class="mb-2"><input formControlName="email" placeholder="Email" class="w-full p-2 border rounded" /></div>
        <div class="mb-2"><input formControlName="password" type="password" placeholder="Password" class="w-full p-2 border rounded" /></div>
        <div><button class="px-4 py-2 bg-green-600 text-white rounded">Register</button></div>
      </form>
    </div>
  `
})
export class RegisterComponent {
  f = this.fb.group({ name:[''], email:[''], password:[''] });
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: ToastService){}
  submit(){
    this.auth.register(this.f.value.name, this.f.value.email, this.f.value.password).subscribe(u => { this.toast.push('Registered & logged in'); this.router.navigate(['/']); });
  }
}
