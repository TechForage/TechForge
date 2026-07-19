const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ApiError = require("../utils/ApiError");

const CART_ITEM_POPULATE = {
  path: "items.product",
  select: "name price discountPrice images stock isActive",
};

/**
 * Mutates cart.totalPrice based on populated item prices.
 * Assumes cart.items[].product is already populated.
 * Uses discountPrice when set and > 0, otherwise falls back to price.
 */
const recalculateTotalPrice = (cart) => {
  cart.totalPrice = cart.items.reduce((sum, item) => {
    const product = item.product;
    if (!product) return sum;
    const unitPrice =
      typeof product.discountPrice === "number" && product.discountPrice > 0
        ? product.discountPrice
        : product.price;
    return sum + unitPrice * item.quantity;
  }, 0);
};

const findCartByUser = async (userId) => {
  return Cart.findOne({ user: userId }).populate(CART_ITEM_POPULATE);
};

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
  }
  return cart;
};

/**
 * Adds a product to the user's cart, or increases quantity if already
 * present. Validates the product exists and that stock covers the
 * cumulative requested quantity.
 */
const addItemToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const cart = await getOrCreateCart(userId);
  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );
  const requestedQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;

  if (requestedQuantity > product.stock) {
    throw new ApiError(
      400,
      `Only ${product.stock} unit(s) of "${product.name}" available in stock`
    );
  }

  if (existingItem) {
    existingItem.quantity = requestedQuantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.populate(CART_ITEM_POPULATE);
  recalculateTotalPrice(cart);
  await cart.save();

  return cart;
};

/**
 * Sets an existing cart item's quantity to an explicit value
 * (not incremented). Validates stock availability.
 */
const updateItemQuantity = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) {
    throw new ApiError(404, "Item not found in cart");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  if (quantity > product.stock) {
    throw new ApiError(
      400,
      `Only ${product.stock} unit(s) of "${product.name}" available in stock`
    );
  }

  item.quantity = quantity;

  await cart.populate(CART_ITEM_POPULATE);
  recalculateTotalPrice(cart);
  await cart.save();

  return cart;
};

const removeItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemExists = cart.items.some(
    (item) => item.product.toString() === productId
  );
  if (!itemExists) {
    throw new ApiError(404, "Item not found in cart");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.populate(CART_ITEM_POPULATE);
  recalculateTotalPrice(cart);
  await cart.save();

  return cart;
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return cart;
};

module.exports = {
  findCartByUser,
  getOrCreateCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
};