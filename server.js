const sequelize = require('../config/connection');
const seedCategory = require('./category-seeds');
const seedProduct = require('./product-seeds');
const seedTag = require('./tag-seeds');
const seedProductTag = require('./product-tag-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCategory();

  await seedProduct();

  await seedTag();

  await seedProductTag();

  process.exit(0);
};

seedAll();
