const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskServices");
const controllerWrapper = require("../utils/controllerWrapper");

const getAllTasks = controllerWrapper(async (req, res) => {
  const tasks = await getAllTasksService();
  res.json(tasks);
});

let getOneTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await getOneTaskService(taskId);
  res.json(task);
};

getOneTask = controllerWrapper(getOneTask);

const createTask = controllerWrapper(async (req, res) => {
  const newTask = await createTaskService(req.body);
  res.status(201).json(newTask);
});

const updateTask = controllerWrapper(async (req, res) => {
  const { taskId } = req.params;
  const updatedTask = await updateTaskService(taskId, req.body);
  res.status(200).json(updatedTask);
});

const deleteTask = controllerWrapper(async (req, res) => {
  const { taskId } = req.params;
  await deleteTaskService(taskId);
  res.sendStatus(204);
});

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
