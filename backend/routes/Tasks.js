const protectedRoute = require("../middleware/protectedRoute");
const {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
  completed,
} = require("../controllers/TaskController");

const router = require("express").Router();

router.get("/getAllTasks", protectedRoute, getAllTasks);
router.post("/addTask", protectedRoute, addTask);
router.put("/completed/:id", protectedRoute, completed);
router.delete("/deleteTask/:id", protectedRoute, deleteTask);
router.put("/updateTask/:id", protectedRoute, updateTask);

module.exports = router;
