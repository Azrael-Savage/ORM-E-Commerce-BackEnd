const express = require('express');
const sequelize = require('./config/connection');

const categoryRoutes = require('./routes/category-routes');
const productRoutes = require('./routes/product-routes');
const tagRoutes = require('./routes/tag-routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tags', tagRoutes);

// Sync Sequelize models with the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
