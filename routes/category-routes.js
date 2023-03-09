const router = require('express').Router();
const { Category, Product } = require('../models');

// GET all categories and their associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a single category by id and its associated products
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id, {
      include: [Product]
    });
    if (!category) {
      res.status(404).json({ message: `Category with id ${id} not found` });
    } else {
      res.json(category);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update an existing category
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id }
    });
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: `Category with id ${id} not found` });
    } else {
      res.json({ message: 'Category updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a category by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.destroy({
      where: { id }
    });
    if (deletedCategory === 0) {
      res.status(404).json({ message: `Category with id ${id} not found` });
    } else {
      res.json({ message: 'Category deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
