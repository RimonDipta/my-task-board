const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "My Task Board",
    },
    description: {
      type: String,
      default: "",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Board", boardSchema);
