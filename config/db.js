const Sequelize = require('sequelize');
const dbConf = require('./config');
const path = require('path');
const fs = require('fs')
// Создание экземпляра Sequelize
let sequelize;
if(process.env.NODE_ENV === "production"){
  sequelize = new Sequelize(dbConf.production.database, dbConf.production.username, dbConf.production.password, {
    host: dbConf.production.host,
    port: dbConf.production.port,
    dialect: dbConf.production.dialect,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.resolve("config","ca-certificate.crt")),
      },
    }
  });  
} else {
  sequelize = new Sequelize(dbConf.development.database, dbConf.development.username, dbConf.development.password, {
    host: dbConf.development.host,
    port: dbConf.development.port,
    dialect: dbConf.development.dialect,
  });  
}

// Тестирование подключения
sequelize
  .authenticate()
  .then(() => {
    console.log('Подключение к базе данных установлено');
  })
  .catch((err) => {
    console.error('Ошибка подключения к базе данных:', err);
  });

module.exports = sequelize;