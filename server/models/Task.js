const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "New Task",
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "👨‍💻", // Default emoji icon
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed", "wont-do"], // Example statuses, will refine based on design
      default: "todo",
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
