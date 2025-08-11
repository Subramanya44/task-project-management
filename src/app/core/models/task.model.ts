export interface Task {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'todo'|'inprogress'|'done';
}
