require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Board = require("./models/Board");
const Task = require("./models/Task");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes

// GET /api/boards/:board-id
app.get("/api/boards/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate("tasks");
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/boards
app.post("/api/boards", async (req, res) => {
  try {
    const board = new Board({
      name: "My Task Board",
      description: "Tasks to keep organised",
    });

    // Create 4 default tasks
    const defaultTasks = [
      {
        name: "Task in Progress",
        description: "",
        icon: "⏰",
        status: "in-progress",
        boardId: board._id,
      },
      {
        name: "Task Completed",
        description: "",
        icon: "🏋️",
        status: "completed",
        boardId: board._id,
      },
      {
        name: "Task Won't Do",
        description: "",
        icon: "☕",
        status: "wont-do",
        boardId: board._id,
      },
      {
        name: "Task To Do",
        description:
          "Work on a Challenge on devChallenges.io, learn TypeScript.",
        icon: "📚",
        status: "todo",
        boardId: board._id,
      },
    ];

    const createdTasks = await Task.insertMany(defaultTasks);
    board.tasks = createdTasks.map((t) => t._id);
    await board.save();

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/boards/:id
app.put("/api/boards/:id", async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("tasks");
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/boards/:id
app.delete("/api/boards/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });

    // Delete associated tasks
    await Task.deleteMany({ boardId: req.params.id });
    await Board.findByIdAndDelete(req.params.id);

    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/tasks/:id
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks (Wait, requirement said "When users select Add new task option, a new task is added")
// The requirements didn't explicitly list POST /api/tasks but implied it. I should add it.
app.post("/api/tasks", async (req, res) => {
  try {
    const { boardId } = req.body;
    if (!boardId)
      return res.status(400).json({ message: "boardId is required" });

    const task = new Task({
      name: "New Task",
      description: "",
      icon: "💬",
      status: "todo",
      boardId,
    });
    await task.save();

    // Update board
    await Board.findByIdAndUpdate(boardId, { $push: { tasks: task._id } });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Remove from board
    await Board.findByIdAndUpdate(task.boardId, { $pull: { tasks: task._id } });
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
