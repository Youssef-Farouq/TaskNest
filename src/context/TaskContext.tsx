import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task, TaskContextType } from '../types';
import { useAuth } from './AuthContext';

const TaskContext = createContext<TaskContextType | null>(null);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) return;
    
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      userId: user.id,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    if (!user) return;
    
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        // Only allow update if user is admin or task owner
        if (task.id === id && (isAdmin() || task.userId === user.id)) {
          return { ...task, ...updates };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    if (!user) return;
    
    setTasks((prevTasks) => 
      prevTasks.filter((task) => {
        // Only allow deletion if user is admin or task owner
        if (task.id === id) {
          return !(isAdmin() || task.userId === user.id);
        }
        return true;
      })
    );
  };

  const getTask = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const getUserTasks = (userId: string) => {
    return tasks.filter((task) => task.userId === userId);
  };

  const getAssignedTasks = (userId: string) => {
    return tasks.filter((task) => task.assignedTo === userId);
  };

  const getAllTasks = () => {
    if (!user) return [];
    return isAdmin() ? tasks : tasks.filter((task) => task.userId === user.id || task.assignedTo === user.id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTask,
        getUserTasks,
        getAssignedTasks,
        getAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}; 