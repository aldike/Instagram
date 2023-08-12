const { Sequelize } = require('sequelize');
const fs = require('fs')
const dbConfig = require('./config')


let sequelize;
if(process.env.NODE_ENV === "production"){
  console.log('Running Production');
  sequelize = new Sequelize(dbConfig.production.database, dbConfig.production.username, dbConfig.production.password, {
    host: dbConfig.production.host,
    dialect: dbConfig.production.dialect,
    port: dbConfig.production.port,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync('config/ca-certificate.crt')
      },
    },
  });
}else{
  console.log('Running Development');
  sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
  });
}
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
      console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;