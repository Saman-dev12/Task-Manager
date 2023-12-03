const { verify } = require("jsonwebtoken");
const Task = require("../models/taskModel");
const addTask = async (req, res) => {
  try {
    const { text, time, completed } = req.body;

    if (!text || !time) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const task = new Task({
      text,
      time,
      completed,
      user: req.user._id,
    });

    await task.save();

    if (task) {
      res.status(200).json({ msg: "Task Added successfully" });
    } else {
      res.status(500).json({ msg: "Failed to save the task" });
    }
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    let deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ msg: "Task not found!" });
    }
    return res.status(200).json({ msg: "Deletion Successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Error during deletion: ${error.message}` });
  }
};
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { text, time, completed } = req.body;
  if (completed) {
    res.status(400).json({ msg: "Task already completed" });
  } else {
    await Task.updateOne({ _id: id }, { $set: { text, time } });
    res.status(200).json({ msg: "Updated Successfully" });
  }
};
const getAllTasks = async (req, res) => {
  const user = req.user.id;
  try {
    let allTasks = await Task.find({ user: user });
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const completed = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.updateOne({ _id: id }, { $set: { completed: true } });
    res.status(200).json({ msg: "Task completed" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getAllTasks, addTask, deleteTask, updateTask, completed };
