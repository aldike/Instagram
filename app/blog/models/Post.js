const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const User = require("../../auth/User");
const Commentary = require('./Commentary');

const Post = sequelize.define('Post', {
  creatorID: {
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

Post.associate = (models) => {
  Post.belongsTo(models.User, { foreignKey: 'creatorID' });
  Post.hasMany(models.Commentary, { foreignKey: 'postId' });
};

module.exports = Post;