import { Task, TaskAPI } from "@/types/task";
  
  let mockTasks: TaskAPI[] = [];
  
  let loggedInUserId: string | null = "1";
  let taskIdCounter = 3;
  
  // Simulate login with fake credentials
  export const login = async (email: string, password: string) => {
    return new Promise<{ token: string; userId: string }>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          console.log('[MockAPI] User logged in');
          loggedInUserId = '1';
          resolve({ token: 'mock-token', userId: '1' });
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
    return new Promise<TaskAPI[]>((resolve) => {
      setTimeout(() => {
        console.log('[MockAPI] Fetching user tasks');
        resolve(mockTasks.filter((task) => task.user === loggedInUserId));
      }, 500);
    });
  };
  
  // Create a new task with date conflict validation
  export const createTask = async (
    newTask: Omit<TaskAPI, 'id' | 'user' | 'completed'>
  ) => {
    return new Promise<TaskAPI>((resolve, reject) => {
      setTimeout(() => {
        const task: TaskAPI = {
          ...newTask,
          id: taskIdCounter.toString(),
          completed: false,
          user: loggedInUserId!,
        };
        mockTasks.push(task);
        console.log("[MockAPI] Task created", task);
        resolve(task);
      }, 500);
    });
  };
  
  // Mark a task as completed
  export const markTaskAsCompleted = async (taskId: string) => {
    return new Promise<TaskAPI>((resolve, reject) => {
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
  ): Promise<TaskAPI[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = mockTasks.filter((task) => task.user === loggedInUserId);
  
        if (start) {
          const startDate = new Date(start).getTime();
          filtered = filtered.filter(
            (t) => t.start_date && new Date(t.start_date).getTime() >= startDate
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
  