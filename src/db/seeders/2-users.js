'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'John Doe',
      password: 'admin',        // temporary
      roleId: 1,
    }], {});
  },
};
