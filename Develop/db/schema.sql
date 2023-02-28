-- Use ecommerce_db
USE ecommerce_db;

-- Categories table
CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Products table
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 10,
  category_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
);

-- Tags table
CREATE TABLE tags (
  id INT NOT NULL AUTO_INCREMENT,
  tag_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ProductTag table
CREATE TABLE product_tags (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT,
  tag_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
);
