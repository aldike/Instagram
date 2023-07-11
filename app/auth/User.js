const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const User = sequelize.define('User', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true, // Update the allowNull to true for the username field
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // Update the allowNull to true for the password field
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
}, {
  timestamps: false,
});

module.exports = User;