const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

//@desc Get all categories
//@route GET /api/categories
//@access Public

const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    message: "All categories",
    count: categories.length,
    data: categories,
  });
});

//@desc add category
//@route POST /api/categories
//@access Public

const addCategory = expressAsyncHandler(async (req, res) => {
  const { name, color, icon, description } = req.body;
  const category = await Category.findOne({ name });
  if (category) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }
  const newCategory = await Category.create({
    name,
    color,
    icon,
    description,
  });
  return res.status(201).json({
    success: true,
    message: "Category added",
    data: newCategory,
  });
});

//desc update Category
//@route PUT /api/categories/:id
//@access Public

const updateCategory = expressAsyncHandler(async (req, res) => {
  const { name, color, icon, description } = req.body;
  const category = await Category.findByIdAndUpdate(req.params.id, {
    name,
    color,
    icon,
    description,
  });
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Category updated",
    data: category,
  });
});

//desc delete Category
//@route DELETE /api/categories/:id
//@access Public

const deleteCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Category deleted",
    data: category,
  });
});

export { getCategories, addCategory, updateCategory, deleteCategory };
