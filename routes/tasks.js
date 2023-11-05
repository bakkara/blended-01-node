const express = require("express");

const {
  getAllTasks,
  getOneTask,
  updateTask,
  createTask,
  deleteTask,
} = require("../controllers/tasksController");

const router = express.Router();

router.get("/", getAllTasks);

router.get("/:taskId", getOneTask);

router.post("/", createTask);

router.patch("/:taskId", updateTask);

router.delete("/:taskId", deleteTask);

module.exports = {
  tasksRouter: router,
};
