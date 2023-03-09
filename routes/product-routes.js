const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../models");

// get all products with associated category and tag data
router.get("/", async (req, res) => {
	try {
		const products = await Product.findAll({
			include: [{ model: Category }, { model: Tag }],
		});
		res.json(products);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get one product by id with associated category and tag data
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id, {
			include: [{ model: Category }, { model: Tag }],
		});
		if (!product) {
			res.status(404).json({ message: "No product found with that id!" });
			return;
		}
		res.json(product);
	} catch (err) {
		res.status(500).json(err);
	}
});

// create a new product
router.post("/", async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);
		if (req.body.tagIds && req.body.tagIds.length) {
			const productTagIdArr = req.body.tagIds.map((tag_id) => {
				return {
					product_id: newProduct.id,
					tag_id,
				};
			});
			await ProductTag.bulkCreate(productTagIdArr);
		}
		res.json(newProduct);
	} catch (err) {
		res.status(400).json(err);
	}
});

// update a product by id
router.put("/:id", async (req, res) => {
	try {
		const updatedProduct = await Product.update(req.body, {
			where: { id: req.params.id },
		});
		if (req.body.tagIds && req.body.tagIds.length) {
			await ProductTag.destroy({ where: { product_id: req.params.id } });
			const productTagIdArr = req.body.tagIds.map((tag_id) => {
				return {
					product_id: req.params.id,
					tag_id,
				};
			});
			await ProductTag.bulkCreate(productTagIdArr);
		} else {
			await ProductTag.destroy({ where: { product_id: req.params.id } });
		}
		res.json({ message: "Product updated successfully." });
	} catch (err) {
		res.status(400).json(err);
	}
});

// delete a product by id
router.delete("/:id", async (req, res) => {
	try {
		const deletedProduct = await Product.destroy({
			where: { id: req.params.id },
		});
		if (!deletedProduct) {
			res.status(404).json({ message: "No product found with that id!" });
			return;
		}
		res.json({ message: "Product deleted successfully." });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
