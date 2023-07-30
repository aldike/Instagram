const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const User = require("../../auth/User");
const Post = require('./Post');

const Commentary = sequelize.define('Commentary', {
  authorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

});

Commentary.belongsTo(User, { foreignKey: 'authorID', as: 'author' });
Commentary.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

module.exports = Commentary;