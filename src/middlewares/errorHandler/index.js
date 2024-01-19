const { ApplicationError } = require('../../utils/errors');

function handleApplicationError (err, req, res, next) {
  if (err instanceof ApplicationError) {
    return res.status( err.status ).send( err.message );
  } else {
    next( err );
  }
}

module.exports = {
  handleApplicationError
};