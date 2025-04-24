const categoryService = require('../services/Categoryservice');


const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};


const getCategoryById = async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
};


const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ message: 'Category created', category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateCategory = async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json({ message: 'Category updated', category });
};


const deleteCategory = async (req, res) => {
  const success = await categoryService.deleteCategory(req.params.id);
  if (!success) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json({ message: 'Category deleted' });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
