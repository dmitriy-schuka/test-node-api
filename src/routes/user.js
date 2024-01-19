const express = require('express');
const hashPassword = require('../middlewares/hashPassword');
const userController = require('../controllers/userController');
const validatorMiddleware = require('../middlewares/validation/userValidators');
const checkToken = require('../middlewares/checkToken');
const userRouter = express.Router();

userRouter.route('/registration')
  .post(
    validatorMiddleware.registrationValidate,
    hashPassword,
    userController.registration,
    userController.createAccessToken);

userRouter.route('/auth')
  .post(
    validatorMiddleware.loginValidate,
    userController.authorization,
    userController.createAccessToken);

// userRouter.route( '(/:id)?' )
userRouter.route('/:id')
  .get(
    checkToken.checkToken,
    userController.getUserById)
  .patch(
    checkToken.checkToken,
    userController.updateUser)
  .delete(
    checkToken.checkToken,
    userController.deleteUserById)

module.exports = userRouter;