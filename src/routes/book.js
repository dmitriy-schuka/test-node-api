const express = require('express');
const bookController = require('../controllers/bookController');
const validatorMiddleware = require('../middlewares/validation/bookValidators');
const {isAuth} = require('../middlewares/auth');
const {isAdmin} = require('../middlewares/isAdmin');
const bookRouter = express.Router();

bookRouter.route('/all')
  .get(bookController.getAllBooks)

bookRouter.route('/:id')
  .get(bookController.getBookById)

bookRouter.route('/admin(/:id)?')
  .post(
    isAuth,
    isAdmin,
    validatorMiddleware.bookValidate,
    bookController.createBook)
  .patch(
    isAuth,
    isAdmin,
    bookController.updateBook)
  .delete(
    isAuth,
    isAdmin,
    bookController.deleteBookById);

module.exports = bookRouter;