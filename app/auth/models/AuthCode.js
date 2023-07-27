const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const AuthCode = sequelize.define('AuthCode', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  validTill: {
    type: DataTypes.DATE,
    allowNull: false, 
  },
},
  {
    timestamps: false,
    freezeTableName: true,
  }
);


module.exports = AuthCode;