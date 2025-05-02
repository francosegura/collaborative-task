import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { router } from 'expo-router';
import { TaskFormData } from '@/types/task';

type FilterType = 'all' | 'completed';

export const useTasksScreen = () => {
  const { user, logout } = useAuth();
  const { tasks, filters, setFilters, createTask, updateTask, loadTasks, statusFilter, setStatusFilter } = useTasks();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [pickerType, setPickerType] = useState<'start' | 'end' | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showPicker = (type: 'start' | 'end') => {
    setPickerType(type);
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    if (pickerType === 'start') setFilters({ ...filters, startDate: date });
    if (pickerType === 'end') setFilters({ ...filters, dueDate: date });
    hidePicker();
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const handleCreateTaskPress = () => {
    setCreateModalVisible(true);
  };

  const handleCloseModal = () => {
    setCreateModalVisible(false);
  };

  const handleCreateTask = async (task: TaskFormData, editMode: boolean, selectedTaskId?: string) => {
    setLoading(true);
    setError(null);
    try {
      if (editMode && selectedTaskId) {
        await updateTask(selectedTaskId, task);
      } else {
        await createTask(task);
      }
      await loadTasks();
      setCreateModalVisible(false);
    } catch (err: any) {
      setError(err?.toString() || 'Error creating/updating task');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setFilters({ ...filters, searchText: text });
  };

  // Get current date in format "Wednesday, April 30"
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: '2-digit'
  });

  return {
    user,
    currentDate,
    tasks,
    activeFilter: statusFilter,
    handleFilterChange: setStatusFilter,
    filters,
    setFilters,
    isPickerVisible,
    showPicker,
    hidePicker,
    handleConfirm,
    handleLogout,
    isCreateModalVisible,
    handleCreateTaskPress,
    handleCloseModal,
    handleCreateTask,
    loading,
    error,
    handleSearchChange
  };
}; 