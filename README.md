# TaskNest - Task Management Application

TaskNest is a modern task management application built with React and Tailwind CSS. It provides a clean and intuitive interface for managing your tasks efficiently.

## Features

- User authentication (signup and login)
- Dashboard with task statistics
- Task management (create, edit, delete, mark as complete)
- Task filtering (all, active, completed)
- Task prioritization
- Due date selection
- Responsive design for all devices

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tasknest.git
   cd tasknest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
tasknest/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # Context providers
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # Project documentation
```

## Usage

1. Create an account or log in with existing credentials
2. Navigate to the dashboard to view task statistics
3. Use the task management page to:
   - Create new tasks
   - Edit existing tasks
   - Mark tasks as complete
   - Delete tasks
   - Filter tasks by status
   - Set task priorities and due dates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
