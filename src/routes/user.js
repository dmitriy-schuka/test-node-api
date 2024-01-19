const express = require('express');
const hashPassword = require('../middlewares/hashPassword');
const userController = require('../controllers/userController');
const validatorMiddleware = require('../middlewares/validation/userValidators');
const {isAuth} = require('../middlewares/auth');
const userRouter = express.Router();

userRouter.route('/signup')
  .post(
    validatorMiddleware.registrationValidate,
    hashPassword,
    userController.registration);

userRouter.route('/login')
  .post(
    validatorMiddleware.loginValidate,
    userController.authorization);

userRouter.route('/:id')
  .get(
    isAuth,
    userController.getUserById)
  .patch(
    isAuth,
    hashPassword,
    userController.updateUser)
  .delete(
    isAuth,
    userController.deleteUserById)

module.exports = userRouter;