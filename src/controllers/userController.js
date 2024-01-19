const db = require('../db/models');
const {createAccessToken} = require('../utils/accessToken');
const {
  ServerError,
  NotUniqueUserName,
  ResourceNotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError
} = require('../utils/errors');
const {passwordCompare} = require('../utils/comparePassword');

module.exports.registration = async (req, res, next) => {
  try {
    const userData = req.body;
    const roleId = userData?.roleId || 2;

    const dataForCreate = {
      ...userData,
      password: res.locals.hashPassword,
      roleId,
    }

    const savedUser = await db.Users.create(dataForCreate);

    if (savedUser?.dataValues) {
      const newUserData = savedUser.dataValues;
      delete newUserData.password;

      const accessToken = await createAccessToken(newUserData);

      if (!accessToken) {
        return next(new UnauthorizedError());
      }

      return res.send({user: newUserData, accessToken});
    }

    return next(new BadRequestError());
  } catch (err) {
    if (err?.name === 'SequelizeUniqueConstraintError') {
      return next(new NotUniqueUserName());
    }
    next(new UnauthorizedError(err));
  }
};

module.exports.authorization = async (req, res, next) => {
  try {
    const {username} = req.body

    if (!username) {
      return next(new ResourceNotFoundError('user'));
    }

    const foundUser = await db.Users.findOne({
      where: {username}
    });

    if (!foundUser && !foundUser.dataValues) {
      return next(new ResourceNotFoundError('user'));
    }

    const user = foundUser.dataValues;

    await passwordCompare(req.body.password, user.password);
    const accessToken = await createAccessToken(user);

    if (!accessToken) {
      return next(new UnauthorizedError());
    }

    delete user.password;

    res.send({user, accessToken});
  } catch (err) {
    next(new UnauthorizedError(err));
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const userId = req?.tokenData?.userId || req.params?.id;

    const user = await db.Users.findOne({
      where: {
        id: userId
      },
      attributes: {
        exclude: ['password']
      }
    });
    if (user) {
      res.send(user);
    } else {
      next(new ResourceNotFoundError('user'));
    }
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const userId = req?.tokenData?.userId || req.params?.id;
    const dataForUpdate = {...req.body};

    if (res.locals.hashPassword) {
      dataForUpdate.password = res.locals.hashPassword;
    }

    const updateUserResponse =  await db.Users.update(dataForUpdate, {
      where: {id: userId}
    });

    if (updateUserResponse && typeof updateUserResponse[0] === 'number' && updateUserResponse[0] > 0) {
      res.send(`User with id: ${userId}, was updated!`);
    } else {
      next(new ResourceNotFoundError('user'));
    }
  } catch (err) {
    next(new ServerError(err));
  }
}

module.exports.deleteUserById = async (req, res, next) => {
  try {
    const deletedUserId = req.params?.id;

    const {userId, userRole} = res.locals.tokenData;

    if (userId === deletedUserId || userRole === 'admin') {
      const removedUser = await db.Users.destroy({
        where: {
          id: deletedUserId
        }
      });

      if (removedUser) {
        res.send(`User with id: ${deletedUserId}, was removed!`);
      } else {
        next(new ResourceNotFoundError('user'));
      }
    } else {
      next(new ForbiddenError());
    }
  } catch (err) {
    next(new BadRequestError(err));
  }
};