const jwt = require('jsonwebtoken');
const {TokenError, ServerError} = require('../utils/errors');
const {JWT_SECRET} = require('../constants/constants');

module.exports.checkToken = async (req, res, next) => {
  const accessToken = req?.headers?.authorization || req?.body?.token;

  if (!accessToken) {
    return next(new TokenError('Need token'));
  }

  const token = accessToken.replace('Bearer ', '');

  try {
    const tokenData = jwt.verify(token, JWT_SECRET);

    if (tokenData) {
      req.tokenData = tokenData;
      return next();
    }
    return next(new TokenError('Token is invalid'));
  } catch (err) {
    next(new ServerError(err));
  }
};
