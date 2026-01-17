# My Task Board

<div align="center">
  <p>A full-stack task management application built with the MERN stack.</p>
  <p><b>Solution for <a href="https://devchallenges.io/challenge/my-task-board-app">DevChallenges.io</a></b></p>
</div>

---

## 📖 Project Overview

This Project is my solution for the **My Task Board** challenge on DevChallenges.io. The goal was to build a task management application that allows users to create, update, and organize tasks across different statuses.

I approached this project as an opportunity to work with the latest technologies, including **React 19**, **Tailwind CSS v4**, and **Express v5**. I wanted to create a seamless user experience with a clean, modern UI and a robust backend API.

## 🚀 Key Features

- **Intuitive Task Management**: Users can easily create, edit, and delete tasks.
- **Board Customization**: The board name and description can be personalized.
- **Visual Status Tracking**: Tasks are organized into "In Progress", "Completed", and "Won't Do" columns with distinct visual cues.
- **Icon Selection**: I implemented a custom icon picker for tasks to add a visual touch.
- **Responsive Design**: The layout adapts perfectly to mobile, tablet, and desktop screens.
- **Persistent Data**: All data is securely stored in MongoDB, ensuring nothing is lost on refresh.

## 🎨 Design

Here is the final look of the application:

|                                                  Desktop                                                  |                                                 Mobile                                                 |
| :-------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
| <img src="./design%20vs%20code/Desktop_1350px_screenshot.png" width="600" alt="Desktop Implementation" /> | <img src="./design%20vs%20code/Mobile_412px_screenshot.png" width="250" alt="Mobile Implementation" /> |

## 🛠️ Tech Stack

I chose a modern MERN stack to ensure scalability and performance:

### Frontend

- **React 19**: Leveraging the latest features for building interactive UIs.
- **Tailwind CSS v4**: For a utility-first, responsive, and maintainable styling approach.
- **Zustand**: A small, fast, and scalable bear-bones state management solution.
- **Vite**: For lightning-fast development and optimized builds.
- **Lucide React**: For beautiful, consistent icons.

### Backend

- **Node.js & Express 5**: Building a robust RESTful API.
- **MongoDB & Mongoose**: For flexible and efficient data modeling.

## 💡 What I Learned

Building this project allowed me to deepen my understanding of:

1. **Full-Stack Integration**: Connecting a React frontend with an Express backend seamlessly.
2. **State Management**: Using **Zustand** to manage global state (like board data and task modals) proved to be much simpler and cleaner than traditional Context API or Redux.
3. **Modern CSS**: customizing **Tailwind CSS** to match the specific design requirements of the challenge.
4. **CRUD Operations**: precise implementation of Create, Read, Update, and Delete operations to ensure the UI stays in sync with the database.

## 🏁 How to Run Locally

If you'd like to run this project on your local machine, follow these steps:

### Prerequisites

- Node.js installed
- MongoDB installed or a MongoDB Atlas connection string

### Steps

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/my-task-board.git
    cd my-task-board
    ```

2.  **Install Dependencies**

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the `server` directory and add your MongoDB connection string:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    PORT=5000
    ```

4.  **Run the Application**

    ```bash
    # Start Backend
    cd server
    npm start

    # Start Frontend (in a new terminal)
    cd ../client
    npm run dev
    ```

## 🙏 Acknowledgements

- Challenge provided by [DevChallenges.io](https://devchallenges.io).
- Design inspiration from their provided Design file.
