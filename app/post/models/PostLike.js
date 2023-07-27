const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/models/User');
const Post = require('./Post');

const PostLike = sequelize.define('PostLike', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
  },
  {
    // timestamps: false,
    freezeTableName: true,
});

PostLike.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

PostLike.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'post',
});

module.exports = PostLike;