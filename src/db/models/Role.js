'use strict';

const {USER_ROLES} = require('../../constants/constants');

module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define( 'Roles', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        // type: DataTypes.ENUM(...USER_ROLES),
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: false,
    });

  Role.associate = function (models) {
    Role.hasMany(models.Users, {
      foreignKey: 'roleId',
      targetKey: 'id'
    });
  };

  return Role;
}