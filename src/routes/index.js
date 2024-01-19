const express = require('express');
const ErrorHandlers = require('./../middlewares/errorHandler');
const checkToken = require('../middlewares/checkToken');
const checkRole = require('../middlewares/checkRole');
const bookRouter = require('./book');
const userRouter = require('./user');
const roleRouter = require('./role');
const router = express.Router();

router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/role', checkToken.checkToken, /*checkRole.checkRole,*/ roleRouter);

router.use(ErrorHandlers.handleApplicationError);

module.exports = router;