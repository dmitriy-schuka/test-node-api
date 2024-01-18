'use strict';

export default (sequelize, DataTypes) => {
  const User = sequelize.define( 'Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      roleId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },

    {
      timestamps: false
    } );

  User.associate = function (models) {
    User.belongsTo(models.Roles, {
      foreignKey: 'roleId',
      sourceKey: 'id'
    });
  };

  return User;
}