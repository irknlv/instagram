const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Role = require('./Role');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isUnique: async function (value) {
        const existingUser = await User.findOne({ where: { email: value } });

        if (existingUser) {
          throw new ValidationError('The email is already in use.');
        }
      },
    },
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isUnique: async function (value) {
        const existingUser = await User.findOne({ where: { login: value } });

        if (existingUser) {
          throw new ValidationError('The login is already in use.');
        }
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  biography: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  active: {
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
User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = User;