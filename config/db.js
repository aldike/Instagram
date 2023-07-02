const { Sequelize } = require('sequelize');
const dbConfig = require('./config')
const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
  host: dbConfig.development.host,
  dialect: dbConfig.development.dialect,
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
      console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;