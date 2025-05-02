import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFormData, TaskFilters } from '../types/task';
import { useAuth } from './AuthContext';
import { isDateInRange } from '../utils/date';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
  setFilters: (filters: TaskFilters) => void;
  createTask: (taskData: TaskFormData) => Promise<void>;
  updateTaskStatus: (taskId: string, status: 'pending' | 'completed') => Promise<void>;
  checkTaskConflict: (startDate: string, dueDate?: string) => boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({});
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
    //   loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a API real
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Tarea de ejemplo',
          description: 'Esta es una tarea de ejemplo',
          startDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          status: 'pending',
          userId: user?.id || '',
        },
      ];
      setTasks(mockTasks);
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: TaskFormData) => {
    try {
      // TODO: Implementar llamada a API real
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        status: 'pending',
        userId: user?.id || '',
      };
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Error al crear la tarea');
      console.error('Error creating task:', err);
      throw err;
    }
  };

  const updateTaskStatus = async (taskId: string, status: 'pending' | 'completed') => {
    try {
      // TODO: Implementar llamada a API real
      setTasks(prev =>
        prev.map(task => (task.id === taskId ? { ...task, status } : task))
      );
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const checkTaskConflict = (startDate: string, dueDate?: string): boolean => {
    const newStartDate = new Date(startDate);
    const newDueDate = dueDate ? new Date(dueDate) : undefined;

    return tasks.some(task => {
      const taskStartDate = new Date(task.startDate);
      const taskDueDate = task.dueDate ? new Date(task.dueDate) : undefined;

      // Verificar si hay superposición de fechas
      if (newDueDate && taskDueDate) {
        return (
          (newStartDate >= taskStartDate && newStartDate <= taskDueDate) ||
          (newDueDate >= taskStartDate && newDueDate <= taskDueDate) ||
          (newStartDate <= taskStartDate && newDueDate >= taskDueDate)
        );
      } else if (newDueDate && taskDueDate) {
        return newStartDate <= taskDueDate && newDueDate >= taskStartDate;
      } else if (taskDueDate) {
        return newStartDate <= taskDueDate && newStartDate >= taskStartDate;
      } else {
        return newStartDate.getTime() === taskStartDate.getTime();
      }
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (!user || task.userId !== user.id) return false;

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      if (!task.title.toLowerCase().includes(searchLower) &&
          !task.description.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    if (filters.startDate && filters.endDate) {
      return isDateInRange(
        new Date(task.startDate),
        filters.startDate,
        filters.endDate
      );
    }

    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        loading,
        error,
        filters,
        setFilters,
        createTask,
        updateTaskStatus,
        checkTaskConflict,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
} 