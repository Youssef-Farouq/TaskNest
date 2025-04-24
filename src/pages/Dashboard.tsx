import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types';
import ThemeToggle from '../components/ThemeToggle';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, updateTask } = useTasks();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Filter tasks for the current user
  const userTasks = tasks.filter(task => task.assignedTo === user.id);

  const handleToggleComplete = (task: Task) => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-dark-card shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-2xl">T</span>
              </div>
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-blue-900 dark:text-white">
                TaskNest
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {user.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Your Tasks
          </h1>

          {/* Tasks List */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {userTasks.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No tasks assigned yet.
                </div>
              ) : (
                userTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {task.description}
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleComplete(task)}
                        className={`ml-4 px-3 py-1 rounded-lg text-sm font-medium ${
                          task.completed
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {task.completed ? 'Completed' : 'Mark Complete'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
