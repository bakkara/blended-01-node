const { readDb, writeDb } = require("../utils/db");
const path = require("path");
const crypto = require("crypto");
const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require("../utils/validation/taskValidationSchemes");
const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskServices");

const taskPath = path.join(process.cwd(), "db", "tasks.json");

const getAllTasks = async (req, res, next) => {
  const tasks = await getAllTasksService();
  res.json(tasks);
};

const getOneTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await getOneTaskService(taskId);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const newTask = await createTaskService(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await updateTaskService(taskId, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    await deleteTaskService(taskId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
