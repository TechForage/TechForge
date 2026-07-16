const mongoose = require("mongoose");
const Brand = require("../models/Brand");

/**
 * @desc    Create a new brand
 * @route   POST /api/brands
 */
const createBrand = async (req, res) => {
  try {
    const { name, description, logo, isActive } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Brand name is required",
      });
    }

    const existingBrand = await Brand.findOne({ name: name.trim() });
    if (existingBrand) {
      return res.status(409).json({
        success: false,
        message: "A brand with this name already exists",
      });
    }

    const brand = await Brand.create({
      name: name.trim(),
      description,
      logo,
      isActive,
    });

    return res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: brand,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A brand with this name already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error while creating brand",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all brands
 * @route   GET /api/brands
 */
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching brands",
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single brand by ID
 * @route   GET /api/brands/:id
 */
const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid brand ID",
      });
    }

    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching brand",
      error: error.message,
    });
  }
};

/**
 * @desc    Update a brand
 * @route   PUT /api/brands/:id
 */
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, logo, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid brand ID",
      });
    }

    if (name) {
      const duplicate = await Brand.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "A brand with this name already exists",
        });
      }
    }

    const brand = await Brand.findByIdAndUpdate(
      id,
      { name, description, logo, isActive },
      { new: true, runValidators: true }
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: brand,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A brand with this name already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error while updating brand",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a brand
 * @route   DELETE /api/brands/:id
 */
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid brand ID",
      });
    }

    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting brand",
      error: error.message,
    });
  }
};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};