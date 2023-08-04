const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/User');
const Commentary = require('./Commentary');
const MediaFile = require('./MediaFile');
const Like = require('./Like');

const Post = sequelize.define('Post', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Post.belongsTo(User, { foreignKey: 'creatorId' });

Post.hasMany(MediaFile, { foreignKey: 'postId' });
Post.hasMany(Commentary, { foreignKey: 'postId' });
Post.hasMany(Like, { foreignKey: 'postId' });

module.exports = Post;