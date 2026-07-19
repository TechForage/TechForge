const mongoose = require("mongoose");
const ApiResponse = require("../utils/ApiResponse");
const orderRepository = require("../repositories/order.repository");

const sendErrorResponse = (res, error) => {
  const statusCode = error?.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: error?.message || "Internal Server Error",
  });
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const ORDER_STATUS_VALUES = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || typeof shippingAddress !== "object") {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "shippingAddress is required",
      });
    }
    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "paymentMethod is required",
      });
    }

    const order = await orderRepository.createOrderFromCart(req.user.id, {
      shippingAddress,
      paymentMethod,
    });
    res.status(201).json(new ApiResponse(201, "Order placed successfully", order));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderRepository.findOrdersByUser(req.user.id);
    res
      .status(200)
      .json(new ApiResponse(200, "Orders fetched successfully", orders));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid order ID" });
    }

    const order = await orderRepository.findOrderById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Order not found" });
    }

    // Only the order owner or an admin may view it
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "You are not allowed to view this order",
      });
    }

    res.status(200).json(new ApiResponse(200, "Order fetched successfully", order));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Admin access required",
      });
    }

    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid order ID" });
    }
    if (!orderStatus || !ORDER_STATUS_VALUES.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: `orderStatus must be one of: ${ORDER_STATUS_VALUES.join(", ")}`,
      });
    }

    const order = await orderRepository.updateOrderStatus(id, orderStatus);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Order not found" });
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Order status updated successfully", order));
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};