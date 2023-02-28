const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
	try {
		// find all products
		const productData = await Product.findAll({
			// be sure to include its associated Category and Tag data
			include: [{ model: Category }, { model: Tag }],
		});

		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get one product
router.get("/:id", async (req, res) => {
	try {
		// find a single product by its `id`
		const productData = await Product.findByPk(req.params.id, {
			// be sure to include its associated Category and Tag data
			include: [{ model: Category }, { model: Tag }],
		});

		if (!productData) {
			res.status(404).json({ message: "No product found with that id!" });
			return;
		}

		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// create new product
router.post("/", async (req, res) => {
	try {
		/* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      category_id: 1,
      tagIds: [1, 2, 3, 4]
    }
    */
		const productData = await Product.create(req.body);

		// if there's product tags, create pairings in the ProductTag model
		if (req.body.tagIds && req.body.tagIds.length) {
			const productTagIdArr = req.body.tagIds.map((tag_id) => {
				return {
					product_id: productData.id,
					tag_id,
				};
			});

			await ProductTag.bulkCreate(productTagIdArr);
		}

		// respond with the newly created product
		res.status(200).json(productData);
	} catch (err) {
		res.status(400).json(err);
	}
});

// update product
router.put("/:id", async (req, res) => {
	try {
		// update product data
		await Product.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		// find all associated tags from ProductTag
		const productTags = await ProductTag.findAll({
			where: { product_id: req.params.id },
		});

		// get list of current tag_ids
		const productTagIds = productTags.map(({ tag_id }) => tag_id);

		// create filtered list of new tag_ids
		const newProductTags = (req.body.tagIds || [])
			.filter((tag_id) => !productTagIds.includes(tag_id))
			.map((tag_id) => {
				return {
					product_id: req.params.id,
					tag_id,
				};
			});

		// figure out which ones to remove
		const productTagsToRemove = productTags
			.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
			.map(({ id }) => id);

		// delete unwanted product tags
		await ProductTag.destroy({ where: { id: productTagsToRemove } });

		// create new product tags
		await ProductTag.bulkCreate(newProductTags);

		// respond with the updated product
		res.status(200).json({ message: "Product updated successfully." });
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		// delete one product by its id value
		const productData = await Product.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!productData) {
			res.status(404).json({ message: "No product found with that id!" });
			return;
		}

		res.status(200).json({ message: "Product deleted successfully." });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
