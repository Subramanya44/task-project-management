import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    { id: 1, name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin', token: 'admintoken' },
    { id: 2, name: 'User', email: 'user@example.com', password: 'user123', role: 'user', token: 'usertoken' }
  ];

  public currentUser = signal<User | null>(this._load());

  private _load(): User | null {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  }

  private _save(user: User | null) {
    this.currentUser.set(user);
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else localStorage.removeItem('currentUser');
  }

  login(email: string, password: string) {
    const user = this.users.find(u => u.email === email && u.password === password);
    return of(user || null).pipe(
      delay(400),
      tap(u => {
        if (u) this._save(u);
      })
    );
  }

  register(name: string, email: string, password: string) {
    const id = Date.now();
    const user: User = { id, name, email, password, role: 'user', token: 'token' + id };
    this.users.push(user);
    return of(user).pipe(delay(400), tap(u => this._save(u)));
  }

  logout() { this._save(null); }
}
