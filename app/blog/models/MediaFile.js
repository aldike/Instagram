const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Post = require("./Post");

const MediaFile = sequelize.define('MediaFile', {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});

MediaFile.belongsTo(Post, {foreignKey: 'postId'});

module.exports = MediaFile;