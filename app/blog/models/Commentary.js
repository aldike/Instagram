const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const Post = require('./Post');
const Like = require('./Like');
const User = require('./User');

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
Commentary.hasMany(Like, { foreignKey: 'commentaryId' });

module.exports = Commentary;