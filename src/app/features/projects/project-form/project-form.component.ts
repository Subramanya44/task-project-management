import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card max-w-lg mx-auto">
      <h3 class="text-lg font-bold mb-2">
        {{ isEdit ? 'Edit' : 'New' }} Project
      </h3>

      <form [formGroup]="f" (ngSubmit)="save()">
        <!-- Project Name -->
        <div class="mb-2">
          <input
            formControlName="name"
            placeholder="Name"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- Project Description -->
        <div class="mb-2">
          <textarea
            formControlName="description"
            placeholder="Description"
            class="w-full p-2 border rounded"
          ></textarea>
        </div>

        <!-- Action Button -->
        <div>
          <button class="px-3 py-1 bg-blue-600 text-white rounded">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProjectFormComponent {
  f = this.fb.group({
    name: [''],
    description: ['']
  });

  /** Flag to determine if the form is in edit mode */
  isEdit = false;

  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private ps: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;

      // Load existing project data into the form
      this.ps.get(this.id).subscribe(project => {
        if (project) {
          this.f.patchValue(project);
        }
      });
    }
  }

  save() {
    if (this.isEdit && this.id) {
      this.ps.update(this.id, this.f.value).subscribe(() => {
        this.toast.push('Updated');
        this.router.navigate(['/projects']);
      });
    } else {
      this.ps.add(this.f.value).subscribe(() => {
        this.toast.push('Created');
        this.router.navigate(['/projects']);
      });
    }
  }
}
