const express = require('express');
const bookController = require('../controllers/bookController');
const validatorMiddleware = require('../middlewares/validation/bookValidators');
const checkToken = require('../middlewares/checkToken');
const checkRole = require('../middlewares/checkRole');
const bookRouter = express.Router();

bookRouter.route('/all')
  .get(bookController.getAllBooks)

bookRouter.route('/:id')
  .get(bookController.getBookById)

bookRouter.route('/admin(/:id)?')
  .post(
    checkToken.checkToken,
    // checkRole.checkRole,
    validatorMiddleware.bookValidate,
    bookController.createBook)
  .patch(
    checkToken.checkToken,
    // checkRole.checkRole,
    bookController.updateBook)
  .delete(
    checkToken.checkToken,
    // checkRole.checkRole,
    bookController.deleteBookById);

module.exports = bookRouter;