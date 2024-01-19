const db = require('../db/models');
const {ServerError, ResourceNotFoundError, BadRequestError} = require('../utils/errors');

module.exports.getAllRoles = (req, res, next) => {
  try {
    db.Roles.findAll().then(roles => {
      res.send({roles});
    }).catch(err => {
      next(new ResourceNotFoundError('roles'));
    });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.createRole = (req, res, next) => {
  try {
    const {name} = req.body;

    db.Roles.create({name})
      .then(createdRole => {
        if (createdRole.dataValues !== []) {
          res.send(createdRole.dataValues);
        } else {
          next(new BadRequestError('Role was not created!'));
        }
      }).catch(err => {
        next(new BadRequestError(err));
      });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.getRoleById = (req, res, next) => {
  try {
    const roleId = req.params?.id;

    db.Roles.findOne({
      where: {
        id: roleId,
      },
    }).then(foundRole => {
      if (foundRole) {
        res.send(foundRole);
      } else {
        next(new ResourceNotFoundError('role'));
      }
    }).catch(err => {
      next(new BadRequestError(err));
    });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.updateRole = (req, res, next) => {
  try {
    const roleId = req.params?.id;

    db.Roles.update(req.body, {
      where: {
        id: roleId
      },
    }).then(result => {
      if (typeof result[0] === 'number' && result[0] > 0) {
        res.send(`Role with id: ${roleId}, was updated!`);
      } else {
        next(new ResourceNotFoundError('role'));
      }
    }).catch(err => {
      next(new BadRequestError(err));
    })
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.deleteRoleById = (req, res, next) => {
  try {
    const roleId = req.params?.id;

    db.Books.destroy({
      where: {
        id: roleId
      }
    }).then(removedBook => {
      if (removedBook) {
        res.send(`Role with id: ${roleId} was removed!`);
      } else {
        next(new ResourceNotFoundError('role'));
      }
    }).catch(err => {
      next(new BadRequestError(err));
    })
  } catch (err) {
    next(new ServerError(err));
  }
};