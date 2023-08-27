'use strict';

const User = require("../app/auth/models/User");
const Post = require("../app/post/models/Post");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comment', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: User.tableName,
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: Post.tableName,
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      refComId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Comment',
          key: 'id',
        },
        allowNull: true,
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
    await queryInterface.dropTable('Comment');
  },
};