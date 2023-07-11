'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the table if it exists
    await queryInterface.dropTable('Users');

    // Create the table with desired modifications
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the table
    await queryInterface.dropTable('Users');
  }
};