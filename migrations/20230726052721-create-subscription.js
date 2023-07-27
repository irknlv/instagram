'use strict';

const User = require('../app/auth/models/User')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscription', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      profileId: {
        type: Sequelize.INTEGER,
        references: {
          model: User.tableName, // Имя связанной таблицы (модели User)
          key: 'id', // Поле, которое связывается (id в модели User)
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      followerId: {
        type: Sequelize.INTEGER,
        references: {
          model: User.tableName, // Имя связанной таблицы (модели User)
          key: 'id', // Поле, которое связывается (id в модели User)
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subscription');
  },
};