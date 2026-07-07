const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../utils/appError');

// @desc    Create a new order from cart (Checkout)
// @route   POST /api/orders
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { shippingAddress } = req.body;

  if (!shippingAddress) {
    return next(new AppError('Please provide a shipping address', 400));
  }

  const cart = await Cart.findOne().populate('items.product');
  if (!cart || cart.items.length === 0) {
    return next(new AppError('Your cart is empty', 400));
  }

  for (const item of cart.items) {
    if (!item.product) {
      return next(new AppError('One of the products in your cart no longer exists', 404));
    }
    if (item.product.stock < item.quantity) {
      return next(new AppError(`Not enough stock for product: ${item.product.name}`, 400));
    }
  }

  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity
  }));

  const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const order = await Order.create({
    orderNumber,
    items: orderItems,
    totalPrice: cart.totalPrice,
    shippingAddress
  });

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity }
    });
  }

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.status(201).json({
    status: 'success',
    message: 'Order placed successfully',
    data: order
  });
});

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    status: 'success',
    message: 'Orders fetched successfully',
    data: orders
  });
});

// @desc    Get single order by ID
// @route   GET /api/orders/:id
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Order fetched successfully',
    data: order
  });
});

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!status || !validStatuses.includes(status)) {
    return next(new AppError('Invalid status value', 400));
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Order status updated successfully',
    data: order
  });
});