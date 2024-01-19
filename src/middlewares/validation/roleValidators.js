const schemas = require('../../utils/validation/role')
const {BadRequestError} = require('../../utils/errors');

module.exports.roleValidate = async (req, res, next) => {
  const validationResult = await schemas.roleSchema.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    next(new BadRequestError('Invalid data for create'));
  }
};

module.exports.createRoleValidate = async (req, res, next) => {
  const validationResult = await schemas.createRoleSchema.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    next(new BadRequestError('Invalid data for create'));
  }
};
