const jwt = require('jsonwebtoken');
const {UnauthorizedError, ServerError} = require('../utils/errors');
const {JWT_SECRET} = require('../constants/constants');

module.exports.isAuth = async (req, res, next) => {
  try {
    const accessToken = req?.headers?.authorization || req?.body?.token;

    if (!accessToken) {
      return next(new UnauthorizedError('Need token'));
    }

    const token = accessToken.replace('Bearer ', '');

    const tokenData = jwt.verify(token, JWT_SECRET);

    if (tokenData) {
      res.locals.tokenData = tokenData
      return next();
    }
    return next(new UnauthorizedError('Token is invalid'));
  } catch (err) {
    next(new ServerError(err));
  }
};
