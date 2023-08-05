const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const Post = require('./Post');
const User = require('../../auth/User');

const Commentary = sequelize.define('Commentary', {
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Commentary.belongsTo(User, { foreignKey: 'userId' });
Commentary.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Commentary;