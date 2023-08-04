const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/User');

const Story = sequelize.define('Story', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Story.belongsTo(User, { foreignKey: 'creatorId' });

module.exports = Story;