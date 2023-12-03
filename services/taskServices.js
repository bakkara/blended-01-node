const Task = require("../model/Task");
const { HttpError } = require("../utils/HttpError");

const getAllTasksService = async () => {
  return await Task.find();
};

const getOneTaskService = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new HttpError(404, "task not found");
  }
  return task;
};

const createTaskService = async (body) => {
  return await Task.create(body);
};

const updateTaskService = async (taskId, body) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true });
  if (!updatedTask) {
    throw new HttpError(404, "task not found");
  }
  return updatedTask;
};

const deleteTaskService = async (taskId) => {
  await Task.findByIdAndDelete(taskId);
};
module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
