const Joi = require("joi");

const createTaskValidationSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  completed: Joi.boolean().required(),
});

const updateTaskValidationSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  completed: Joi.boolean(),
}).or("title", "completed");

module.exports = {
  createTaskValidationSchema,
  updateTaskValidationSchema,
};
