const yup = require('yup');

module.exports.bookSchema = yup.object().shape({
  title: yup.string().required().min(1),
  author: yup.string().required().min(1),
  year: yup.number().required().positive().integer().min(1900).max(2024),
  genre: yup.string().required().min(1),
});