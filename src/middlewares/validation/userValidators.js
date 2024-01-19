const schemas = require('../../utils/validation/user')
const {BadRequestError} = require('../../utils/errors');

module.exports.registrationValidate = async (req, res, next) => {
  const validationResult = await schemas.registrationSchema.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    next(new BadRequestError('Invalid data for registration'));
  }
};

module.exports.loginValidate = async (req, res, next) => {
  const validationResult = await schemas.loginSchema.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    next(new BadRequestError('Invalid data for authorization'));
  }
};