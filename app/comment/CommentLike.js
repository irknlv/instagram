const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Предполагается, что у вас есть экземпляр Sequelize с именем "sequelize"
const User = require('../auth/models/User');
const Comment = require('./Comment');

const CommentLike = sequelize.define('CommentLike', {
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

CommentLike.belongsTo(User, {
  foreignKey: 'userId',
});

CommentLike.belongsTo(Comment, {
  foreignKey: 'commentId',
});

module.exports = CommentLike;