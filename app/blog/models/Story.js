const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/User');
const Like = require('./Like')
const MediaFile = require('./MediaFile');

const Story = sequelize.define('Story', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Story.belongsTo(User, { foreignKey: 'creatorId' });
Story.hasMany(Like, { foreignKey: 'storyId' });

const MediaFile = require('./MediaFile');
Story.hasMany(MediaFile, { foreignKey: 'storyId' });

module.exports = Story;