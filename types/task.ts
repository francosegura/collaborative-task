export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  dueDate?: string;
  status: 'pending' | 'completed';
  userId: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  startDate: string;
  dueDate?: string;
}

export interface TaskFilters {
  startDate?: Date;
  endDate?: Date;
  searchText?: string;
} 