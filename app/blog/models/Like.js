const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/User');
const Post = require('./Post');
const Story = require('./Story')
const Commentary = require('./Commentary')

const Like = sequelize.define('Like', {

});

Like.belongsTo(User, { foreignKey: 'creatorId' });
Like.belongsTo(Post, { foreignKey: 'postId' });
Like.belongsTo(Story, { foreignKey: 'storyId' });
Like.belongsTo(Commentary, { foreignKey: 'commentaryId' });
module.exports = Post;