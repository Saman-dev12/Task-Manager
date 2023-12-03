const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
