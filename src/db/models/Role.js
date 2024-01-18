'use strict';

const {USER_ROLES} = require('../../constants/constants');

export default (sequelize, DataTypes) => {
  const Role = sequelize.define( 'Roles', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM(...USER_ROLES),
        allowNull: false
      },
    },

    {
      timestamps: false,
    });

  Role.associate = function (models) {
    Role.hasOne(models.Users, { foreignKey: 'roleId', targetKey: 'id' });
  };

  return Role;
}