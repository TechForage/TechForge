const mongoose = require("mongoose");
const ApiResponse = require("../utils/ApiResponse");
const wishlistRepository = require("../repositories/wishlist.repository");

const sendErrorResponse = (res, error) => {
  const statusCode = error?.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: error?.message || "Internal Server Error",
  });
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistRepository.findWishlistByUser(req.user.id);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Wishlist fetched successfully",
          wishlist || { products: [] }
        )
      );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid product ID" });
    }

    const wishlist = await wishlistRepository.addProductToWishlist(
      req.user.id,
      productId
    );
    res
      .status(200)
      .json(new ApiResponse(200, "Product added to wishlist", wishlist));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid product ID" });
    }

    const wishlist = await wishlistRepository.removeProductFromWishlist(
      req.user.id,
      productId
    );
    res
      .status(200)
      .json(new ApiResponse(200, "Product removed from wishlist", wishlist));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};