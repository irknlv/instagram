const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/models/User');

const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // timestamps: false,
    freezeTableName: true,
  }
);
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;