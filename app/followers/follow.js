const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');

const Follow = sequelize.define('Follow', {
  followingUserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      field: 'id',
    },
  },
  followedByUserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      field: 'id',
    },
  },
});

Follow.belongsTo(User, { foreignKey: 'followingUserId', as: 'FollowingUser' });
Follow.belongsTo(User, { foreignKey: 'followedByUserId', as: 'FollowedByUser' });

module.exports = Follow;