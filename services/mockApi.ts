// mockApi.ts

export type Task = {
    id: number;
    title: string;
    description: string;
    start_date: string; // Format: YYYY-MM-DD
    due_date?: string | null;
    completed: boolean;
    user: number;
  };
  
  let mockTasks: Task[] = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Go to the local supermarket',
      start_date: '2025-04-30',
      due_date: '2025-05-01',
      completed: false,
      user: 1,
    },
    {
      id: 2,
      title: 'Finish React Native test',
      description: 'Implement task management screens',
      start_date: '2025-04-30',
      due_date: null,
      completed: false,
      user: 1,
    },
  ];
  
  let loggedInUserId: number | null = 1;
  let taskIdCounter = 3;
  
  // Simulate login with fake credentials
  export const login = async (email: string, password: string) => {
    return new Promise<{ token: string; userId: number }>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          console.log('[MockAPI] User logged in');
          loggedInUserId = 1;
          resolve({ token: 'mock-token', userId: 1 });
        } else {
          reject('Invalid credentials');
        }
      }, 500);
    });
  };
  
  // Simulate user registration
  export const register = async (email: string, password: string) => {
    return login(email, password); // Same mock behavior as login
  };
  
  // Get all tasks for the logged-in user
  export const fetchTasks = async () => {
    return new Promise<Task[]>((resolve) => {
      setTimeout(() => {
        console.log('[MockAPI] Fetching user tasks');
        resolve(mockTasks.filter((task) => task.user === loggedInUserId));
      }, 500);
    });
  };
  
  // Create a new task with date conflict validation
  export const createTask = async (
    newTask: Omit<Task, 'id' | 'user' | 'completed'>
  ) => {
    return new Promise<Task>((resolve, reject) => {
      setTimeout(() => {
        const hasConflict = mockTasks.some((task) => {
          if (task.user !== loggedInUserId) return false;
  
          const newStart = new Date(newTask.start_date).getTime();
          const newEnd = newTask.due_date
            ? new Date(newTask.due_date).getTime()
            : newStart;
  
          const taskStart = new Date(task.start_date).getTime();
          const taskEnd = task.due_date
            ? new Date(task.due_date).getTime()
            : taskStart;
  
          return (
            (newStart <= taskEnd && newStart >= taskStart) ||
            (newEnd >= taskStart && newEnd <= taskEnd)
          );
        });
  
        if (hasConflict) {
          reject('Task date range overlaps with an existing task.');
        } else {
          const task: Task = {
            ...newTask,
            id: taskIdCounter++,
            completed: false,
            user: loggedInUserId!,
          };
          mockTasks.push(task);
          console.log('[MockAPI] Task created', task);
          resolve(task);
        }
      }, 500);
    });
  };
  
  // Mark a task as completed
  export const markTaskAsCompleted = async (taskId: number) => {
    return new Promise<Task>((resolve, reject) => {
      setTimeout(() => {
        const task = mockTasks.find(
          (t) => t.id === taskId && t.user === loggedInUserId
        );
        if (!task) return reject('Task not found');
        task.completed = true;
        console.log('[MockAPI] Task marked as completed');
        resolve(task);
      }, 400);
    });
  };
  
  // Filter tasks by start_date or due_date
  export const searchTasks = async (
    start?: string,
    end?: string
  ): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = mockTasks.filter((task) => task.user === loggedInUserId);
  
        if (start) {
          const startDate = new Date(start).getTime();
          filtered = filtered.filter(
            (t) => new Date(t.start_date).getTime() >= startDate
          );
        }
  
        if (end) {
          const endDate = new Date(end).getTime();
          filtered = filtered.filter(
            (t) =>
              !t.due_date ||
              new Date(t.due_date).getTime() <= endDate
          );
        }
  
        console.log('[MockAPI] Search results:', filtered);
        resolve(filtered);
      }, 400);
    });
  };
  