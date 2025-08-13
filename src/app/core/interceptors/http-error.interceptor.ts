import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError(error => {
      console.error('HTTP Error:', error);
      switch (error.status) {
        case 0:
          toast.push('Unable to connect to the server. Please check your network.');
          break;
        case 400:
          toast.push(error.error?.message || 'Invalid request.');
          break;
        case 401:
          toast.push('Your session has expired. Please log in again.');
          localStorage.removeItem('token');
          router.navigate(['/login']);
          break;
        case 403:
          toast.push('You do not have permission to perform this action.');
          break;
        case 404:
          toast.push('Requested resource not found.');
          break;
        case 500:
          toast.push('Something went wrong on our side. Please try again later.');
          break;
        default:
          toast.push(error.error?.message || 'An unknown error occurred.');
      }

      return throwError(() => error);
    })
  );
};
