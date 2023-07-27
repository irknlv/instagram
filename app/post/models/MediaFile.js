const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Post = require('./Post');

const MediaFile = sequelize.define('MediaFile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Ассоциация с моделью Post
MediaFile.belongsTo(Post, {
  foreignKey: 'postId', // Поле, которое связывает модели MediaFile и Post
});
Post.hasMany(MediaFile, {
  foreignKey: 'postId', as: 'mediaFiles' // Поле, которое связывает модели MediaFile и Post
});

module.exports = MediaFile;