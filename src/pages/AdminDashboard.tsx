import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import ThemeToggle from '../components/ThemeToggle';
import { User, Task, Priority } from '../types';
import {
  UserIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const userTasks = selectedUser 
    ? tasks.filter(task => task.assignedTo === selectedUser.id)
    : tasks;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    dueDate: '',
    userId: selectedUser?.id || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId) {
      alert('Please select a user to assign the task to');
      return;
    }

    // Create new task with proper user assignment
    const newTask = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate,
      assignedTo: formData.userId,
      completed: false,
      createdBy: user.id,
    };

    addTask(newTask);
    
    setFormData({
      title: '',
      description: '',
      priority: 'medium' as Priority,
      dueDate: '',
      userId: selectedUser?.id || '',
    });
    setIsModalOpen(false);
  };

  // Update form data when selected user changes
  useEffect(() => {
    if (selectedUser) {
      setFormData(prev => ({
        ...prev,
        userId: selectedUser.id
      }));
    }
  }, [selectedUser]);

  const handleDeleteUser = (userId: string) => {
    // Don't allow deleting the admin
    if (userId === user.id) {
      alert("You cannot delete your own admin account.");
      return;
    }

    // Get current users from localStorage
    const currentUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const updatedUsers = currentUsers.filter(u => u.id !== userId);
    
    // Update localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Delete all tasks associated with this user
    const userTasks = tasks.filter(task => task.assignedTo === userId);
    userTasks.forEach(task => deleteTask(task.id));

    // Reset selected user if it was the deleted one
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }

    // Close delete confirmation
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-dark-card shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-2xl">T</span>
              </div>
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-blue-900 dark:text-white">
                TaskNest Admin
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-gray-600 dark:text-gray-300">
                Welcome, {user.name}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Users & Tasks Management
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedUser
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!selectedUser}
            >
              <PlusIcon className="h-5 w-5 mr-1.5" />
              Add Task {selectedUser ? `for ${selectedUser.name}` : '(Select a user first)'}
            </button>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {users.map((u: User) => (
              <div
                key={u.id}
                className={`p-4 rounded-lg shadow-md transition-all relative ${
                  u.id === selectedUser?.id
                    ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-500'
                    : 'bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <button
                  onClick={() => setSelectedUser(u.id === selectedUser?.id ? null : u)}
                  className="w-full text-left"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                      <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {u.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {u.email}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        u.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {u.role}
                      </span>
                    </div>
                  </div>
                </button>
                
                {/* Delete User Button (only show for non-admin users) */}
                {u.role !== 'admin' && (
                  <div className="absolute top-2 right-2">
                    {showDeleteConfirm === u.id ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          title="Confirm Delete"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                          title="Cancel"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowDeleteConfirm(u.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
                        title="Delete User"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tasks Section */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedUser ? `${selectedUser.name}'s Tasks` : 'All Tasks'}
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                  {userTasks.map((task: Task) => (
                    <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => updateTask(task.id, { ...task, completed: !task.completed })}
                          className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                            task.completed
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}
                        >
                          <CheckIcon className={`h-4 w-4 mr-1.5 ${task.completed ? 'opacity-100' : 'opacity-0'}`} />
                          {task.completed ? 'Completed' : 'Mark Complete'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => navigate(`/tasks/${task.id}`)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsModalOpen(false)}>
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white dark:bg-dark-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit} className="p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                  Add New Task
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Assign To
                    </label>
                    <select
                      id="userId"
                      value={formData.userId}
                      onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                      required
                    >
                      <option value="">Select a user</option>
                      {users.map((u: User) => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Priority
                    </label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 