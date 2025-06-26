# Property Agent Management Application

This is a full-stack application for managing property agents and their properties built with Vue 3 + TypeScript frontend and NestJS backend. This is intended as a test for PURE.

## Project Structure

This project consists of two main parts:

- `client/` - Vue 3 + TypeScript frontend built with Vite
- `api/` - NestJS backend API

## Prerequisites

- Node.js (v20.x or later recommended)
- npm or yarn
- Git

## Backend Setup (NestJS)

### Installation

```bash
# Navigate to the server directory
cd api

# Install dependencies
npm install
```

### Configuration

The backend is configured to run on `http://localhost:3000` by default.

### Running the Backend

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Frontend Setup (Vue 3 + TypeScript)

### Installation

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install
```

### Configuration

The frontend is configured to connect to the backend at `http://localhost:3000`. If your backend is running on a different URL, update the API base URL in the API service files.

### Running the Frontend

```bash
# Development mode with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173` by default.

## Using the Application

1. Start the backend server first
2. Start the frontend development server
3. Open your browser and navigate to `http://localhost:5173`


By Adulfo Emmanuel Respecia