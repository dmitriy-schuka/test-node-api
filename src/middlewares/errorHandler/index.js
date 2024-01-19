const {ApplicationError} = require('../../utils/errors');

function handleApplicationError(err, req, res, next) {
  if (err instanceof ApplicationError) {
    return res.status(err.status).send(err.message);
  } else {
    const errorMessage = err?.message || err;
    return res.status(500).send('Unexpected server error: ', errorMessage)
  }
}

module.exports = {
  handleApplicationError
};