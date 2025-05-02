export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  dueDate?: Date | null;
  completed: boolean;
  user: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  startDate: Date | null;
  dueDate?: Date | null;
  assignedTo: string;
  completed: boolean;
}

export interface TaskFilters {
  startDate?: Date;
  dueDate?: Date;
  searchText?: string;
} 

export type TaskAPI = Omit<Task, 'startDate' | 'dueDate'> & {
  start_date: string;
  due_date?: string | null;
};