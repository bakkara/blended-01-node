const { readDb, writeDb } = require("../utils/db");
const path = require("path");
const crypto = require("crypto");
const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require("../utils/validation/taskValidationSchemes");

const taskPath = path.join(process.cwd(), "db", "tasks.json");

const getAllTasks = async (req, res, next) => {
  const tasks = await readDb();
  res.json(tasks);
};

const getOneTask = async (req, res, next) => {
  const tasks = await readDb();
  const { taskId } = req.params;
  const task = tasks.find((item) => item.id === taskId);
  if (!task) {
    res.status(404).json({ message: "task not found" });
    return;
  }
  res.json(task);
};

const createTask = async (req, res, next) => {
  const { error } = createTaskValidationSchema.validate(req.body);
  if (error) {
    res.status(422).json({ message: `${error}` });
    return;
  }
  const tasks = await readDb();
  const newTask = {
    ...req.body,
    id: crypto.randomUUID(),
  };
  tasks.push(newTask);
  await writeDb(tasks);
  res.status(201).json(newTask);
};

const updateTask = async (req, res, next) => {
  const { error } = updateTaskValidationSchema.validate(req.body);
  if (error) {
    res.status(422).json({ message: `${error}` });
    return;
  }
  const tasks = await readDb();
  const { taskId } = req.params;
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    res.status(404).json({ message: "task not found" });
    return;
  }

  tasks.splice(index, 1, { ...tasks[index], ...req.body });
  await writeDb(tasks);
  res.status(200).json(tasks[index]);
};

const deleteTask = async (req, res, next) => {
  const tasks = await readDb();
  const { taskId } = req.params;
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    res.status(404).json({ message: "task not found" });
    return;
  }

  tasks.splice(index, 1);
  await writeDb(tasks);
  res.sendStatus(204);
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
