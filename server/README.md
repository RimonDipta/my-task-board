# My Task Board Server

The backend API for the My Task Board project, built with **Node.js**, **Express**, and **MongoDB**.

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express 5**: Fast, unopinionated web framework for Node.js.
- **MongoDB & Mongoose**: NoSQL database and object modeling.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (Local or Atlas)

### Installation

1.  Navigate to the server directory:

    ```bash
    cd server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/my-task-board # Or your Atlas connection string
PORT=4000
```

### Connecting the Client

The client application connects to this server using the `VITE_API_URL` environment variable.

1.  Deploy this server and note the URL (e.g., `https://my-task-board-api.onrender.com`).
2.  Configure the client's `.env` file or deployment settings:
    ```env
    VITE_API_URL=https://my-task-board-api.onrender.com/api
    ```

### Running the Server

To start the server:

```bash
node index.js
```

Or if you have `nodemon` installed globally (optional dev tool):

```bash
nodemon index.js
```

The server will start on the port defined in your `.env` file (default `4000`).

## 🚀 Deployment to Render

1.  Create a new **Web Service** on [Render](https://render.com).
2.  Connect your GitHub repository.
3.  Use the following settings:
    - **Root Directory**: `server`
    - **Build Command**: `npm install`
    - **Start Command**: `node index.js`
4.  Add the following **Environment Variables**:
    - `MONGODB_URI`: Your production MongoDB connection string (e.g., from MongoDB Atlas).
    - `PORT`: `4000` (or leave default, Render sets this automatically, but good to be explicit/aware).

## 📡 API Endpoints

### Boards

- `GET /api/boards/:id` - Get board details
- `POST /api/boards` - Create a new board
- `PUT /api/boards/:id` - Update board details (name, description)
- `DELETE /api/boards/:id` - Delete a board

### Tasks

- `POST /api/tasks` - Create a new task in a board
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
