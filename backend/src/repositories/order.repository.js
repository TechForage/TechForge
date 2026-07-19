const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ApiError = require("../utils/ApiError");

const ORDER_POPULATE = {
  path: "items.product",
  select: "name images price discountPrice",
};

/**
 * Creates an order from the user's current cart:
 *  - validates stock for every item
 *  - captures a snapshot unit price per item
 *  - decrements Product.stock
 *  - clears the cart
 * All of the above run inside a MongoDB transaction so a mid-way
 * failure (e.g. insufficient stock on item 3 of 5) leaves no partial
 * state behind. Requires a replica-set-backed MongoDB deployment
 * (Atlas clusters, including the free M0 tier, satisfy this).
 */
const createOrderFromCart = async (userId, { shippingAddress, paymentMethod }) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = await Cart.findOne({ user: userId }).session(session);
    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        throw new ApiError(404, `Product ${item.product} no longer exists`);
      }
      if (product.stock < item.quantity) {
        throw new ApiError(
          400,
          `Only ${product.stock} unit(s) of "${product.name}" available in stock`
        );
      }

      const unitPrice =
        typeof product.discountPrice === "number" && product.discountPrice > 0
          ? product.discountPrice
          : product.price;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: unitPrice,
      });
      totalAmount += unitPrice * item.quantity;

      product.stock -= item.quantity;
      await product.save({ session });
    }

    const [order] = await Order.create(
      [
        {
          user: userId,
          items: orderItems,
          shippingAddress,
          paymentMethod,
          totalAmount,
        },
      ],
      { session }
    );

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return Order.findById(order._id).populate(ORDER_POPULATE);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const findOrdersByUser = async (userId) => {
  return Order.find({ user: userId })
    .populate(ORDER_POPULATE)
    .sort({ createdAt: -1 });
};

const findOrderById = async (orderId) => {
  return Order.findById(orderId).populate(ORDER_POPULATE);
};

const updateOrderStatus = async (orderId, orderStatus) => {
  return Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true, runValidators: true }
  ).populate(ORDER_POPULATE);
};

module.exports = {
  createOrderFromCart,
  findOrdersByUser,
  findOrderById,
  updateOrderStatus,
};