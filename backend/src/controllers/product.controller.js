const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * @desc    Create a new product
 * @route   POST /api/products
 */
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      stock,
      images,
      category,
      brand,
      rating,
      numReviews,
      isFeatured,
      isActive,
    } = req.body;

    // Basic required-field validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Product name is required" });
    }
    if (price === undefined || price === null || price < 0) {
      return res.status(400).json({ success: false, message: "A valid product price is required" });
    }
    if (stock === undefined || stock === null || stock < 0) {
      return res.status(400).json({ success: false, message: "A valid stock quantity is required" });
    }
    if (!category || !isValidObjectId(category)) {
      return res.status(400).json({ success: false, message: "A valid category ID is required" });
    }
    if (!brand || !isValidObjectId(brand)) {
      return res.status(400).json({ success: false, message: "A valid brand ID is required" });
    }

    // Confirm referenced category/brand actually exist
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ success: false, message: "Referenced category not found" });
    }

    const brandExists = await Brand.findById(brand);
    if (!brandExists) {
      return res.status(404).json({ success: false, message: "Referenced brand not found" });
    }

    const product = await Product.create({
      name: name.trim(),
      description,
      price,
      discountPrice,
      stock,
      images,
      category,
      brand,
      rating,
      numReviews,
      isFeatured,
      isActive,
    });

    const populatedProduct = await product.populate(["category", "brand"]);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: populatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all products (supports basic filtering via query params)
 * @route   GET /api/products
 */
const getProducts = async (req, res) => {
  try {
    const { category, brand, isFeatured, isActive } = req.query;
    const filter = {};

    if (category && isValidObjectId(category)) filter.category = category;
    if (brand && isValidObjectId(brand)) filter.brand = brand;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === "true";
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const products = await Product.find(filter)
      .populate("category", "name description image isActive")
      .populate("brand", "name description logo isActive")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(id)
      .populate("category", "name description image isActive")
      .populate("brand", "name description logo isActive");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching product",
      error: error.message,
    });
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    if (updates.category && !isValidObjectId(updates.category)) {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }
    if (updates.category) {
      const categoryExists = await Category.findById(updates.category);
      if (!categoryExists) {
        return res.status(404).json({ success: false, message: "Referenced category not found" });
      }
    }

    if (updates.brand && !isValidObjectId(updates.brand)) {
      return res.status(400).json({ success: false, message: "Invalid brand ID" });
    }
    if (updates.brand) {
      const brandExists = await Brand.findById(updates.brand);
      if (!brandExists) {
        return res.status(404).json({ success: false, message: "Referenced brand not found" });
      }
    }

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("category", "name description image isActive")
      .populate("brand", "name description logo isActive");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating product",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting product",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};