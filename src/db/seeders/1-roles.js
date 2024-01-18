'use strict';

const {USER_ROLES} = require('../../constants/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.PostgreSQL - library@localhost
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const defaultRoles = USER_ROLES.map((name) => ({name}));
    await queryInterface.bulkInsert('Roles', defaultRoles, {});
  },
};