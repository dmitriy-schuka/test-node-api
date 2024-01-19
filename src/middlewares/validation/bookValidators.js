const schemas = require('../../utils/validation/book')
const {BadRequestError} = require('../../utils/errors');

module.exports.bookValidate = async (req, res, next) => {
  const validationResult = await schemas.bookSchema.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    next(new BadRequestError('Invalid data for create'));
  }
};
