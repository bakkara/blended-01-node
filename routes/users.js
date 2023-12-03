const express = require('express');
const createUserValidationSchema = require('../utils/validation/userValidationSchema');
const validationWrapper = require('../utils/validationWrapper');
const { registerUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', validationWrapper(createUserValidationSchema), registerUser)

module.exports = {
    userRouter: router
}