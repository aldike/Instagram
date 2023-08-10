const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/User');
const Post = require('../blog/models/Post');
const Story = require('../blog/models/Story')
const Commentary = require('../blog/models/Commentary')

const Like = sequelize.define('Like', {

});

Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });
Like.belongsTo(Story, { foreignKey: 'storyId' });
Like.belongsTo(Commentary, { foreignKey: 'commentaryId' });

module.exports = Like;