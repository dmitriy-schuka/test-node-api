const {ForbiddenError, ServerError} = require('../utils/errors');

module.exports.isAdmin = async (req, res, next) => {
  try {
    const {userRole} = res.locals.tokenData;

    if (userRole && userRole === 'admin') {
      return next();
    }
    return next(new ForbiddenError());
  } catch (err) {
    next(new ServerError(err));
  }
};