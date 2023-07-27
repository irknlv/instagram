const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/models/User');
const Story = require('./Story');

const StoryWatched = sequelize.define('StoryWatched', {
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

StoryWatched.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

StoryWatched.belongsTo(Story, {
  foreignKey: 'storyId',
  as: 'story',
});

module.exports = StoryWatched;