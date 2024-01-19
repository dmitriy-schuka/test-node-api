const yup = require('yup');

module.exports.registrationSchema = yup.object().shape({
  username: yup.string().required().min(1),
  password: yup.string().required().min(6),
});

module.exports.loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
