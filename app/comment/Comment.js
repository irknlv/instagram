const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Предполагается, что у вас есть экземпляр Sequelize с именем "sequelize"
const User = require('../auth/models/User');
const Post = require('../post/models/Post');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  // timestamps: false,
  freezeTableName: true,
}
);
Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

Comment.belongsTo(Post, {
    foreignKey: 'postId',
    as: 'post',
});

Comment.belongsTo(Comment, {
    foreignKey: 'refComId',
    as: 'refCom',
});

module.exports = Comment;