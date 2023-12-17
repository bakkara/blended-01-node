const { registerService, loginService } = require("../services/authServices");
const controllerWrapper = require("../utils/controllerWrapper");

const registerUser = controllerWrapper(async (req, res) => {
  console.log(req.body);
  const newUser = await registerService(req.body);

  res.status(201).json(newUser);
});

const loginUser = controllerWrapper(async (req, res) => {
  const token = await loginService(req.body);
  res.json({ token });
});

module.exports = {
  registerUser,
  loginUser,
};
