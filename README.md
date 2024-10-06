# CarWorks Frontend

This is the frontend part of the **CarWorks** project, built with **React**. It provides a user interface to interact with car-related data, user roles, and the backend services of CarWorks. The frontend also integrates role-based access control (RBAC) and visual components for displaying car and user data.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Tailwind CSS Integration](#tailwind-css-integration)
- [Project Structure](#project-structure)
- [License](#license)

## Technologies Used
- React (v18+)
- Redux Toolkit (for state management)
- React Router (for routing)
- Axios (for API requests)
- Tailwind CSS (for styling)
- React Toastify (for notifications)
- jsPDF & jsPDF-AutoTable (for PDF generation)
- XLSX (for Excel data handling)
- React Select (for dropdowns)
- React Spinners (for loading spinners)

## Prerequisites

Before setting up and running this project, ensure you have the following installed on your local machine:

- **Node.js** (v16+)
- **npm** (or **yarn** if preferred)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <https://github.com/AbhishekKadavergu/car-works-ui.git>
   cd carworks-frontend
   ```

2. **Install dependencies**:
   Run the following command to install all project dependencies:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Create a `.env` file in the root of the project.
   - Add the required environment variables (see [Environment Variables](#environment-variables) below).

## Running the Application

1. **For development**:
   Run the following command to start the development server:
   ```bash
   npm start
   ```

   This will start the React development server at `http://localhost:3000`.

2. **For production**:
   First, build the project:
   ```bash
   npm run build
   ```

   Then serve the files using any static server like `serve`, or integrate it into a backend.

## Building the Application

To build the application for production, use:

```bash
npm run build
```

The build folder will contain the optimized, minified files that are ready to be deployed.

## Scripts

Here are the main scripts available:

- **`npm start`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run test`**: Runs the tests.
- **`npm run eject`**: Ejects the project configuration. Use with caution.

## Environment Variables

To configure the frontend, you may need to add certain environment variables to a `.env` file. These variables can include API endpoints or other project-specific configurations.

Example `.env` file:
```bash
REACT_APP_API_URL=<your-backend-api-url>
REACT_APP_ENV=development
```

## Tailwind CSS Integration

This project uses **Tailwind CSS** for styling. All styles are managed through utility classes provided by Tailwind. To modify or add styles, you can directly use Tailwind utility classes in the components.

For custom configurations, you can modify the `tailwind.config.js` file or add custom styles to the `src/index.css` file.

## Project Structure

Here’s an outline of the project structure:

```
carworks-frontend/
│
├── public/                # Static files like index.html
├── src/
│   ├── assets/            # Static assets like images or fonts
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── redux/             # Redux state management setup
│   ├── routes/            # React Router setup for navigating between pages
│   ├── services/          # API services (e.g., Axios calls)
│   ├── styles/            # Tailwind CSS and other custom styles
│   └── App.js             # Main application component
│   └── index.js           # Entry point for the application
├── package.json           # Project metadata and dependencies
└── README.md              # Documentation for the project
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.
