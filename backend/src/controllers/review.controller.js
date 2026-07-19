const mongoose = require("mongoose");
const ApiResponse = require("../utils/ApiResponse");
const reviewRepository = require("../repositories/review.repository");

const sendErrorResponse = (res, error) => {
  const statusCode = error?.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: error?.message || "Internal Server Error",
  });
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createReview = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid product ID" });
    }
    if (rating === undefined || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Rating must be between 1 and 5",
      });
    }

    const purchased = await reviewRepository.hasUserPurchasedProduct(
      req.user.id,
      productId
    );
    if (!purchased) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "You can only review products you have purchased",
      });
    }

    const review = await reviewRepository.createReview(req.user.id, productId, {
      rating,
      comment,
    });
    res.status(201).json(new ApiResponse(201, "Review submitted successfully", review));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { id: productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid product ID" });
    }

    const reviews = await reviewRepository.findReviewsByProduct(productId);
    res
      .status(200)
      .json(new ApiResponse(200, "Reviews fetched successfully", reviews));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid review ID" });
    }
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Rating must be between 1 and 5",
      });
    }

    const existingReview = await reviewRepository.findReviewById(id);
    if (!existingReview) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Review not found" });
    }
    if (existingReview.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "You can only update your own review",
      });
    }

    const review = await reviewRepository.updateReview(id, { rating, comment });
    res.status(200).json(new ApiResponse(200, "Review updated successfully", review));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid review ID" });
    }

    const existingReview = await reviewRepository.findReviewById(id);
    if (!existingReview) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Review not found" });
    }
    if (existingReview.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "You can only delete your own review",
      });
    }

    await reviewRepository.deleteReview(id, existingReview.product);
    res.status(200).json(new ApiResponse(200, "Review deleted successfully"));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
};