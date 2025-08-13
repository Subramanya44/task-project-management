import { Injectable, signal } from '@angular/core';
export interface Toast { id:number; message:string; }
@Injectable({providedIn:'root'})
export class ToastService {
  public toasts = signal<Toast[]>([]);

  push(message: string) {
    const id = Date.now();
    this.toasts.update(arr => [...arr, { id, message }]);
    setTimeout(() => this.remove(id), 3000);
  }

  remove(id:number){
    this.toasts.set(this.toasts().filter(t=>t.id!==id)); 
  }
}
