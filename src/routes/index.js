const express = require('express');
const {isAuth} = require('../middlewares/auth');
const {isAdmin} = require('../middlewares/isAdmin');
const bookRouter = require('./book');
const userRouter = require('./user');
const roleRouter = require('./role');
const router = express.Router();

router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/role', isAuth, isAdmin, roleRouter);

module.exports = router;