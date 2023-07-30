const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const User = require("../../auth/User");
const Commentary = require('./Commentary');

const Post = sequelize.define('Post', {
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

});

ost.belongsTo(User, { foreignKey: 'creatorId' });
Post.hasMany(Commentary, { foreignKey: 'postId' });

module.exports = Post;