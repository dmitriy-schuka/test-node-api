const db = require('../db/models');
const jwt = require('jsonwebtoken');
const {
  ServerError,
  NotUniqueUserName,
  ResourceNotFoundError,
  UserNotFoundError,
  BadRequestError
} = require('../utils/errors');
const {passwordCompare} = require('../utils/comparePassword');
const {JWT_SECRET, ACCESS_TOKEN_TIME} = require('../constants/constants');

module.exports.registration = (req, res, next) => {
  try {
    const userData = req.body;
    userData.password = req.hashPassword;
    userData.roleId = 2;
    db.Users.create(userData).then(savedUser => {
      if (savedUser) {
        req.newUser = savedUser.dataValues;
        next();
      }
    }).catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        next(new NotUniqueUserName(err));
      } else {
        next(new BadRequestError(err));
      }
    })
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.createAccessToken = (req, res, next) => {
  try {
    const user = req?.newUser || req?.foundUser;

    const accessToken = jwt.sign({
      userId: user.id,
      username: user.username
    }, JWT_SECRET, {expiresIn: ACCESS_TOKEN_TIME});

    db.Users.update({accessToken}, {where: {id: user.id}})
      .then(updatedUser => {
        if (updatedUser) {
          res.send({token: accessToken});
        } else {
          next(new UserNotFoundError('User was not found'));
        }
      }).catch(err => {
      next(new BadRequestError(err));
    });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.authorization = async (req, res, next) => {
  try {
    const foundUser = await db.Users.findOne({
      where: {username: req.body?.username}
    });
    await passwordCompare(req.body.password, foundUser.password);
    req.foundUser = foundUser;
    next();
  } catch (err) {
    next(new ServerError(err));
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
      next(new UserNotFoundError('User was not found'));
    }
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.updateUser = (req, res, next) => {
  try {
    const userId = req?.tokenData?.userId || req.params?.id;

    db.Users.update(req.body, {
      where: {id: userId}
    }).then(result => {
      if (typeof result[0] === 'number' && result[0] > 0) {
        res.send(`User with id: ${userId}, was updated!`);
      } else {
        next(new UserNotFoundError('User was not found'));
      }
    }).catch(err => {
      next(new BadRequestError(err))
    })
  } catch (err) {
    next(new ServerError(err));
  }
}

module.exports.deleteUserById = (req, res, next) => {
  try {
    const deletedUserId = req.params?.id;

    db.Users.destroy({
      where: {
        id: deletedUserId
      }
    }).then(removedProduct => {
      if (removedProduct) {
        res.send(`User with id: ${deletedUserId}, was removed!`);
      } else {
        next(new UserNotFoundError('User was not found'));
      }
    }).catch(err => {
      next(new BadRequestError(err))
    })
  } catch (err) {
    next(new ServerError(err));
  }
};