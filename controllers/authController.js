const { registerService } = require("../services/authServices");
const controllerWrapper = require("../utils/controllerWrapper");


const registerUser = controllerWrapper (async (req, res) => {
    console.log(req.body)
    const newUser = await registerService(req.body);
    
    res.status(201).json(newUser);
  });

module.exports = {
    registerUser
}