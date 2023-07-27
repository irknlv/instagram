'use strict';

const Post = require("../app/post/models/Post");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MediaFile', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Post.tableName, // Название таблицы связанной модели
          key: 'id', // Поле, с которым связывается модель
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MediaFile');
  },
};