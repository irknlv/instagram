const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/models/User');

const Subscription = sequelize.define('Subscription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }  
  },
  {
    // timestamps: false,
    freezeTableName: true,
  }
);
Subscription.belongsTo(User, {
    foreignKey: 'profileId',
    as: 'profile',
  });
Subscription.belongsTo(User, {
    foreignKey: 'followerId',
    as: 'follower',
});
User.hasMany(Subscription, {
  foreignKey: 'followerId', as: 'follower' // Поле, которое связывает модели MediaFile и Post
});
User.hasMany(Subscription, {
  foreignKey: 'profileId', as: 'profile' // Поле, которое связывает модели MediaFile и Post
});

module.exports = Subscription;