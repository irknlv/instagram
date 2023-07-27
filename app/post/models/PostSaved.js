const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/models/User');
const Post = require('./Post');

const PostSaved = sequelize.define('PostSaved', {
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

PostSaved.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

PostSaved.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'post',
});

module.exports = PostSaved;