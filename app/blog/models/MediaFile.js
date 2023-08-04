const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Post = require('./Post');
const Story = require('./Story')

const MediaFile = sequelize.define('MediaFile', {
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

MediaFile.belongsTo(Post, {foreignKey: 'postId'});
MediaFile.belongsTo(Story, {foreignKey: 'storyId'});

module.exports = MediaFile;