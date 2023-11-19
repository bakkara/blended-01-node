const express = require("express");

const {
  getAllTasks,
  getOneTask,
  updateTask,
  createTask,
  deleteTask,
} = require("../controllers/tasksController");
const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require("../utils/validation/taskValidationSchemes");
const validationWrapper = require("../utils/validationWrapper");

const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
  .post(validationWrapper(createTaskValidationSchema), createTask);

router
  .route("/:taskId")
  .get(getOneTask)
  .patch(validationWrapper(updateTaskValidationSchema), updateTask)
  .delete(deleteTask);

module.exports = {
  tasksRouter: router,
};
