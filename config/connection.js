const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce_db', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
});

module.exports = sequelize;
