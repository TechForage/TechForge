const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const ApiError = require("../utils/ApiError");

const WISHLIST_POPULATE = {
  path: "products",
  select: "name price discountPrice images stock isActive",
};

const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }
  return wishlist;
};

const findWishlistByUser = async (userId) => {
  return Wishlist.findOne({ user: userId }).populate(WISHLIST_POPULATE);
};

const addProductToWishlist = async (userId, productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const wishlist = await getOrCreateWishlist(userId);

  const alreadyExists = wishlist.products.some(
    (p) => p.toString() === productId
  );
  if (alreadyExists) {
    throw new ApiError(409, "Product is already in your wishlist");
  }

  wishlist.products.push(productId);
  await wishlist.populate(WISHLIST_POPULATE);
  await wishlist.save();

  return wishlist;
};

const removeProductFromWishlist = async (userId, productId) => {
  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    throw new ApiError(404, "Wishlist not found");
  }

  const exists = wishlist.products.some((p) => p.toString() === productId);
  if (!exists) {
    throw new ApiError(404, "Product not found in wishlist");
  }

  wishlist.products = wishlist.products.filter(
    (p) => p.toString() !== productId
  );
  await wishlist.populate(WISHLIST_POPULATE);
  await wishlist.save();

  return wishlist;
};

module.exports = {
  findWishlistByUser,
  addProductToWishlist,
  removeProductFromWishlist,
};