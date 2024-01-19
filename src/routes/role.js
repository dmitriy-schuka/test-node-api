const express = require('express');
const roleController = require('../controllers/roleController');
const validatorMiddleware = require('../middlewares/validation/roleValidators');
const roleRouter = express.Router();

roleRouter.route('/all')
  .get(roleController.getAllRoles)

// roleRouter.route('/:id')
//   .get(roleController.getRoleById)

roleRouter.route('(/:id)?')
  .get(roleController.getRoleById)
  .post(validatorMiddleware.createRoleValidate, roleController.createRole)
  .patch(validatorMiddleware.createRoleValidate, roleController.updateRole)
  .delete(roleController.deleteRoleById);

module.exports = roleRouter;