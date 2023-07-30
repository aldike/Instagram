const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const User = require("../../auth/User");

const Commentary = sequelize.define('Commentary', {
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

});

Commentary.associate = (models) => {
  Commentary.belongsTo(models.User, { foreignKey: 'authorID' });
  Commentary.belongsTo(models.Post, { foreignKey: 'postId' });
};
module.exports = Commentary;