import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFormData, TaskFilters, TaskAPI } from '../types/task';
import { useAuth } from './AuthContext';
import { isDateInRange } from '../utils/date';
import * as mockApi from '../services/mockApi';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
  setFilters: (filters: TaskFilters) => void;
  createTask: (taskData: TaskFormData) => Promise<void>;
  updateTaskStatus: (taskId: string, status: 'pending' | 'completed') => Promise<void>;
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
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const mockTasks = await mockApi.fetchTasks();
      setTasks(mockTasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        user: task.user,
        startDate: task.start_date ? new Date(task.start_date) : null,
        dueDate: task.due_date ? new Date(task.due_date) : null
      })));
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
      const newTask: TaskAPI = {
        id: Date.now().toString(),
        user: user?.id || "",
        start_date: taskData.startDate ? taskData.startDate.toISOString() : "",
        due_date: taskData.dueDate ? taskData.dueDate.toISOString() : "",
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed
      };
      const response = await mockApi.createTask(newTask);
      setTasks(prev => [...prev, {
        ...response,
        startDate: response.start_date ? new Date(response.start_date) : null,
        dueDate: response.due_date ? new Date(response.due_date) : null
      }]);
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

  const filteredTasks = tasks.filter(task => {
    if (!user || task.user !== user.id) return false;

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      if (!task.title.toLowerCase().includes(searchLower) &&
          !task.description.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    if (filters.startDate && filters.dueDate) {
      return isDateInRange(
        task.startDate || new Date(),
        filters.startDate,
        filters.dueDate
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