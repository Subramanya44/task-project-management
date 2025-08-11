import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable({providedIn:'root'})
export class ProjectService {
  private _data: Project[] = [
    { id:1, name:'Project Alpha', description:'First', createdAt: new Date().toISOString() },
    { id:2, name:'Project Beta', description:'Second', createdAt: new Date().toISOString() },
    { id:3, name:'Project Gamma', description:'Third', createdAt: new Date().toISOString() }
  ];
  public projects = signal<Project[]>(this._data);
  list(){ return of(this.projects()).pipe(delay(300)); }
  get(id:number){ return of(this.projects().find(p=>p.id===id) || null).pipe(delay(200)); }
  add(payload: Partial<Project>){ const id = Date.now(); const p:Project = { id, name: payload.name||'Untitled', description: payload.description||'', createdAt: new Date().toISOString() }; this._data.unshift(p); this.projects.set(this._data); return of(p).pipe(delay(200)); }
  update(id:number, payload: Partial<Project>){ const idx = this._data.findIndex(p=>p.id===id); if(idx>-1){ this._data[idx] = {...this._data[idx], ...payload}; this.projects.set(this._data); } return of(this._data.find(p=>p.id===id) || null).pipe(delay(200)); }
  delete(id:number){ this._data = this._data.filter(p=>p.id!==id); this.projects.set(this._data); return of(true).pipe(delay(200)); }
}
