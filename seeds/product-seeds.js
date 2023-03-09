// seedProducts.js
const { Product, Category } = require("../models");

const productData = [
	{
		product_name: "Plain T-Shirt",
		price: 14.99,
		stock: 14,
		category_name: "Shirts",
	},
	{
		product_name: "Running Sneakers",
		price: 90.0,
		stock: 25,
		category_name: "Shoes",
	},
	{
		product_name: "Branded Baseball Hat",
		price: 22.99,
		stock: 12,
		category_name: "Hats",
	},
	{
		product_name: "Top 40 Music Compilation Vinyl Record",
		price: 12.99,
		stock: 50,
		category_name: "Music",
	},
	{
		product_name: "Cargo Shorts",
		price: 29.99,
		stock: 22,
		category_name: "Shorts",
	},
];

const seedProducts = async () => {
	const categories = await Category.findAll(); // Get all categories from database

	// Replace category_name values in productData with corresponding category IDs from database
	const productsWithIds = productData.map((product) => {
		const category = categories.find(
			(category) => category.category_name === product.category_name
		);
		return {
			...product,
			category_id: category.id,
		};
	});

	await Product.bulkCreate(productsWithIds);
};

module.exports = seedProducts;
