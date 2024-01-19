const db = require('../db/models');
const jwt = require('jsonwebtoken');
const {RoleError, ServerError, UserNotFoundError} = require('../utils/errors');
const {JWT_SECRET} = require('../constants/constants');

module.exports.checkRole = async (req, res, next) => {
  const accessToken = req?.headers?.authorization || req?.body?.token;
  const token = accessToken.replace('Bearer ', '');

  try {
    const {userId} = jwt.verify(token, JWT_SECRET);

    if (userId) {
      const user = await db.Users.findOne({
        where: {
          id: userId
        },
        attributes: {
          exclude: ['username', 'password', 'accessToken'],
        },
        include: [
          {
            model: db.Roles,
          },
        ],
      });

      if (user?.dataValues?.Role?.name === 'admin') {
        return next();
      } else {
        return next(new RoleError());
      }
    }
    return next(new RoleError());
  } catch (err) {
    next(new ServerError(err));
  }
};