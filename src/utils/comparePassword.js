const bcrypt = require('bcrypt');
const {UserNotFoundError} = require('../utils/errors');

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    throw new UserNotFoundError('Wrong password');
  }
};