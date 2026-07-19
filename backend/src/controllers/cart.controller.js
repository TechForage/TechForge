const mongoose = require("mongoose");
const ApiResponse = require("../utils/ApiResponse");
const cartRepository = require("../repositories/cart.repository");

const sendErrorResponse = (res, error) => {
  const statusCode = error?.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: error?.message || "Internal Server Error",
  });
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getCart = async (req, res) => {
  try {
    const cart = await cartRepository.findCartByUser(req.user.id);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Cart fetched successfully",
          cart || { items: [], totalPrice: 0 }
        )
      );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "A valid productId is required",
      });
    }
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await cartRepository.addItemToCart(
      req.user.id,
      productId,
      quantity
    );
    res.status(200).json(new ApiResponse(200, "Item added to cart", cart));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid product ID" });
    }
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await cartRepository.updateItemQuantity(
      req.user.id,
      productId,
      quantity
    );
    res.status(200).json(new ApiResponse(200, "Cart item updated", cart));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid product ID" });
    }

    const cart = await cartRepository.removeItemFromCart(req.user.id, productId);
    res.status(200).json(new ApiResponse(200, "Item removed from cart", cart));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await cartRepository.clearCart(req.user.id);
    res.status(200).json(new ApiResponse(200, "Cart cleared successfully", cart));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};