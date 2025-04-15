import { Link } from 'react-router-dom';
import { ClockIcon, CheckCircleIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
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
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <Link
                to="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 text-sm font-medium shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-4 sm:mb-6 leading-tight transition-colors duration-200">
              Organize Your Tasks,
              <br className="hidden sm:block" />
              <span className="text-blue-600 dark:text-blue-400">Boost Your Productivity</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 px-4 transition-colors duration-200">
              TaskNest helps you manage your tasks efficiently with a clean and intuitive interface. Stay organized
              and focused on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 text-base font-medium shadow-md hover:shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-base font-medium"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Task Management Feature */}
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200">
              <CheckCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-3 transition-colors duration-200">
              Task Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
              Create, edit, and organize your tasks with ease. Set priorities and due dates to stay on track.
            </p>
          </div>

          {/* Smart Filtering Feature */}
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200">
              <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-3 transition-colors duration-200">
              Smart Filtering
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
              Filter tasks by status, priority, or due date to focus on what needs your attention.
            </p>
          </div>

          {/* Responsive Design Feature */}
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200">
              <DevicePhoneMobileIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-3 transition-colors duration-200">
              Responsive Design
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
              Access your tasks from any device with our fully responsive interface.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-700 py-6 sm:py-8 mt-auto transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
            © {new Date().getFullYear()} TaskNest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;