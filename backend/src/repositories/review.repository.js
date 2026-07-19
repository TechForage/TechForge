const mongoose = require("mongoose");
const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");
const ApiError = require("../utils/ApiError");

const REVIEW_USER_POPULATE = { path: "user", select: "firstName lastName avatar" };

/**
 * Recomputes and persists Product.rating (avg, rounded to 1 decimal)
 * and Product.numReviews from the Review collection.
 */
const recalcProductRatingStats = async (productId) => {
  const stats = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  const { avgRating = 0, numReviews = 0 } = stats[0] || {};

  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(avgRating * 10) / 10,
    numReviews,
  });
};

/**
 * "Purchased" is defined as: the user has at least one order (of any
 * status) containing this product. Tighten to Order.orderStatus ===
 * "Delivered" if you want to require delivery before reviewing.
 */
const hasUserPurchasedProduct = async (userId, productId) => {
  const order = await Order.findOne({
    user: userId,
    "items.product": productId,
  });
  return Boolean(order);
};

const findReviewByUserAndProduct = async (userId, productId) => {
  return Review.findOne({ user: userId, product: productId });
};

const createReview = async (userId, productId, { rating, comment }) => {
  const existing = await findReviewByUserAndProduct(userId, productId);
  if (existing) {
    throw new ApiError(409, "You have already reviewed this product");
  }

  let review;
  try {
    review = await Review.create({ user: userId, product: productId, rating, comment });
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "You have already reviewed this product");
    }
    throw error;
  }

  await recalcProductRatingStats(productId);

  return Review.findById(review._id).populate(REVIEW_USER_POPULATE);
};

const findReviewsByProduct = async (productId) => {
  return Review.find({ product: productId })
    .populate(REVIEW_USER_POPULATE)
    .sort({ createdAt: -1 });
};

const findReviewById = async (reviewId) => {
  return Review.findById(reviewId);
};

const updateReview = async (reviewId, { rating, comment }) => {
  const review = await Review.findByIdAndUpdate(
    reviewId,
    { rating, comment },
    { new: true, runValidators: true }
  ).populate(REVIEW_USER_POPULATE);

  if (review) {
    await recalcProductRatingStats(review.product);
  }

  return review;
};

const deleteReview = async (reviewId, productId) => {
  await Review.findByIdAndDelete(reviewId);
  await recalcProductRatingStats(productId);
};

module.exports = {
  hasUserPurchasedProduct,
  findReviewByUserAndProduct,
  createReview,
  findReviewsByProduct,
  findReviewById,
  updateReview,
  deleteReview,
};