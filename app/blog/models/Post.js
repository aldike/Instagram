const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/User');

const Post = sequelize.define('Post', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Post.belongsTo(User, { foreignKey: 'creatorId' });

module.exports = Post;