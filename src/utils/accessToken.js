const db = require("../db/models");
const jwt = require('jsonwebtoken');
const {JWT_SECRET, ACCESS_TOKEN_TIME} = require("../constants/constants");
const {ServerError} = require('../utils/errors');

module.exports.createAccessToken = async (user) => {
  try {
    const role = await db.Roles.findOne({
      where: {
        id: user.roleId,
      },
    })

    if (!role) {
      return null;
    }

    return jwt.sign({
      userId: user.id,
      userRole: role.name,
      username: user.username
    }, JWT_SECRET, {expiresIn: ACCESS_TOKEN_TIME});
  } catch (err) {
    throw new ServerError(err);
  }
};