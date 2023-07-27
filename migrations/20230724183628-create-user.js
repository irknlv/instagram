'use strict';

const Role = require("../app/auth/models/Role");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photoUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      biography: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: Role.tableName,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};