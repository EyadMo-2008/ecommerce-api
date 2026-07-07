const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../utils/appError');

const getOrCreateCart = async () => {
  let cart = await Cart.findOne();
  if (!cart) {
    cart = await Cart.create({ items: [], totalPrice: 0 });
  }
  return cart;
};

const calculateTotalPrice = (cart) => {
  cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// @desc    Get cart contents
// @route   GET /api/cart
exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await getOrCreateCart();
  await cart.populate('items.product', 'name price');

  res.status(200).json({
    status: 'success',
    message: 'Cart fetched successfully',
    data: cart
  });
});

// @desc    Add item to cart
// @route   POST /api/cart/items
exports.addItemToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const qty = Number(quantity) || 1;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (product.stock < qty) {
    return next(new AppError('Not enough stock available', 400));
  }

  const cart = await getOrCreateCart();
  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (itemIndex > -1) {
    const newQuantity = cart.items[itemIndex].quantity + qty;
    if (product.stock < newQuantity) {
      return next(new AppError('Not enough stock available for this total quantity', 400));
    }
    cart.items[itemIndex].quantity = newQuantity;
    cart.items[itemIndex].price = product.price;
  } else {
    cart.items.push({ product: productId, quantity: qty, price: product.price });
  }

  calculateTotalPrice(cart);
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Item added to cart successfully',
    data: cart
  });
});

// @desc    Update item quantity in cart
// @route   PATCH /api/cart/items/:productId
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const qty = Number(quantity);

  if (qty <= 0) {
    return next(new AppError('Quantity must be greater than 0', 400));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (product.stock < qty) {
    return next(new AppError('Not enough stock available', 400));
  }

  const cart = await Cart.findOne();
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex === -1) {
    return next(new AppError('Item not found in cart', 404));
  }

  cart.items[itemIndex].quantity = qty;
  cart.items[itemIndex].price = product.price;

  calculateTotalPrice(cart);
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Cart item updated successfully',
    data: cart
  });
});

// @desc    Remove an item from cart
// @route   DELETE /api/cart/items/:productId
exports.removeCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const cart = await Cart.findOne();
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex === -1) {
    return next(new AppError('Item not found in cart', 404));
  }

  cart.items.splice(itemIndex, 1);

  calculateTotalPrice(cart);
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Item removed from cart successfully',
    data: cart
  });
});

// @desc    Clear entire cart
// @route   DELETE /api/cart
exports.clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne();
  if (cart) {
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
  }

  res.status(200).json({
    status: 'success',
    message: 'Cart cleared successfully',
    data: cart
  });
});