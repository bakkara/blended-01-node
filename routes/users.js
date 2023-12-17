const express = require("express");
const {
  createUserValidationSchema,
  userLoginValidationSchema,
} = require("../utils/validation/userValidationSchema");
const validationWrapper = require("../utils/validationWrapper");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  validationWrapper(createUserValidationSchema),
  registerUser
);
router.post("/login", validationWrapper(userLoginValidationSchema), loginUser);

module.exports = {
  userRouter: router,
};
