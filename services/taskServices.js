const { readDb, writeDb } = require("../utils/db");
const crypto = require("crypto");
const HttpError = require("../utils/HttpError");

const getAllTasksService = async () => {
  return await readDb();
};

const getOneTaskService = async (taskId) => {
  const tasks = await readDb();
  const task = tasks.find((item) => item.id === taskId);
  if (!task) {
    throw new HttpError(404, "task not found");
  }
  return task;
};

const createTaskService = async (body) => {
  const tasks = await readDb();
  const newTask = {
    ...body,
    id: crypto.randomUUID(),
  };

  tasks.push(newTask);
  await writeDb(tasks);
  return newTask;
};

const updateTaskService = async (taskId, body) => {
  const tasks = await readDb();
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    throw new HttpError(404, "task not found");
  }
  tasks.splice(index, 1, { ...tasks[index], ...body });
  await writeDb(tasks);
  return tasks[index];
};

const deleteTaskService = async (taskId) => {
  const tasks = await readDb();
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    throw new HttpError(404, "task not found");
  }

  tasks.splice(index, 1);
  await writeDb(tasks);
};
module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
