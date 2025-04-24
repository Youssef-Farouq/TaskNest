export type Priority = 'low' | 'medium' | 'high';

export type UserRole = 'admin' | 'user';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  userId: string;
  assignedTo?: string;
  createdBy: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  isAdmin: () => boolean;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'userId' | 'createdBy'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
  getUserTasks: (userId: string) => Task[];
  getAssignedTasks: (userId: string) => Task[];
  getAllTasks: () => Task[];
  canAddTask: () => boolean;
} 