import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import ThemeToggle from '../components/ThemeToggle';
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ListBulletIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { Task } from '../types';

interface StatCardProps {
  icon: React.ReactNode;
  bgColor: string;
  label: string;
  value: number;
  valueColor: string;
}

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const { getAllTasks, updateTask } = useTasks();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user) {
      const userTasks = getAllTasks();
      setTasks(userTasks);
    }
  }, [user, getAllTasks]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isAdmin()) {
    return <Navigate to="/admin" />;
  }

  const toggleTaskCompletion = (taskId: string, completed: boolean) => {
    updateTask(taskId, { completed });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter((task) => task.priority === 'high').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className="bg-white dark:bg-dark-card shadow-sm fixed w-full top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                <span className="text-white font-bold text-lg sm:text-2xl">T</span>
              </div>
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-blue-900 dark:text-white transition-colors duration-200">
                TaskNest
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <h1 className="text-xl sm:text-3xl font-bold text-blue-900 dark:text-white mb-8 transition-colors duration-200">
            Your Tasks
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {/* Total Tasks */}
            <StatCard
              icon={<ListBulletIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
              bgColor="bg-blue-100 dark:bg-blue-900/30"
              label="Total Tasks"
              value={totalTasks}
              valueColor="text-blue-900 dark:text-blue-100"
            />

            {/* Completed Tasks */}
            <StatCard
              icon={<CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />}
              bgColor="bg-green-100 dark:bg-green-900/30"
              label="Completed"
              value={completedTasks}
              valueColor="text-green-600 dark:text-green-100"
            />

            {/* Pending Tasks */}
            <StatCard
              icon={<ClockIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
              bgColor="bg-yellow-100 dark:bg-yellow-900/30"
              label="Pending"
              value={pendingTasks}
              valueColor="text-yellow-600 dark:text-yellow-100"
            />

            {/* High Priority */}
            <StatCard
              icon={<ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />}
              bgColor="bg-red-100 dark:bg-red-900/30"
              label="High Priority"
              value={highPriorityTasks}
              valueColor="text-red-600 dark:text-red-100"
            />
          </div>

          {/* Tasks List */}
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-md overflow-x-auto transition-colors duration-200">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-white transition-colors duration-200">
                All Tasks
              </h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm sm:text-base">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    Priority
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    Due Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap max-w-xs truncate">
                      <div className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 sm:hidden transition-colors duration-200">
                        {task.priority}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        } transition-colors duration-200`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400 hidden md:table-cell transition-colors duration-200">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleTaskCompletion(task.id, !task.completed)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          task.completed
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800'
                        }`}
                      >
                        <CheckIcon className={`w-4 h-4 mr-1.5 ${task.completed ? 'opacity-100' : 'opacity-0'}`} />
                        {task.completed ? 'Completed' : 'Mark Complete'}
                      </button>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 sm:px-6 py-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200"
                    >
                      No tasks assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, bgColor, label, value, valueColor }: StatCardProps) => (
  <div className="bg-white dark:bg-dark-card p-4 sm:p-6 rounded-2xl shadow-md flex items-center transition-colors duration-200">
    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} rounded-lg flex items-center justify-center transition-colors duration-200`}>
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-200">{label}</p>
      <p className={`text-xl sm:text-2xl font-bold ${valueColor} transition-colors duration-200`}>{value}</p>
    </div>
  </div>
);

export default Dashboard;
