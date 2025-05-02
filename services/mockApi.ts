import { TaskAPI } from "@/types/task";
  
let loggedInUserId: string = "1";
let taskIdCounter = 3;


let mockTasks: TaskAPI[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    start_date: new Date("2023-01-01").toISOString(),
    due_date: new Date("2023-01-05").toISOString(),
    completed: false,
    user: "1",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    start_date: new Date("2023-01-02").toISOString(),
    due_date: new Date("2023-01-06").toISOString(),
    completed: true,
    user: "1",
  },
];

  
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
        console.log("loggedInUserId", loggedInUserId);
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

  export const updateTask = async (taskId: string, taskData: TaskAPI) => {
    return new Promise<TaskAPI>((resolve, reject) => {
      setTimeout(() => {
        const task = mockTasks.find(t => t.id === taskId);
        if (!task) return reject('Task not found');
        Object.assign(task, taskData);
        console.log('[MockAPI] Task updated', task);
        resolve(task);
      }, 400);
    });
  };
  
  