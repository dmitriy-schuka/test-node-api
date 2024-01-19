const yup = require('yup');

module.exports.createRoleSchema = yup.object().shape({
  name: yup.string().required().min(1)
});

module.exports.roleSchema = yup.object().shape({
  name: yup.string().matches(/(user|admin)/).required().min(1)
});