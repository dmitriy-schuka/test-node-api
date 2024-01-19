const bcrypt = require('bcrypt');
const {UnauthorizedError} = require('../utils/errors');

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    throw new UnauthorizedError('Wrong password');
  }
};