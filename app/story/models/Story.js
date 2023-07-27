const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/models/User');

const Story = sequelize.define('Story', {
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
    // timestamps: false,
    freezeTableName: true,
});

Story.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = Story;