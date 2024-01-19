'use strict';

const bcrypt = require("bcrypt");
const {SALT_ROUNDS} = require("../../constants/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash('admin', SALT_ROUNDS);
    await queryInterface.bulkInsert('Users', [{
      username: 'Admin',
      password: adminPassword,
      roleId: 1,
    }], {});
  },
};
