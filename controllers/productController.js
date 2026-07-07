const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../utils/appError');

// @desc    Create a new product
// @route   POST /api/products
exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, category, stock, images } = req.body;

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return next(new AppError('Category not found', 404));
  }

  const product = await Product.create({ name, description, price, category, stock, images });

  res.status(201).json({
    status: 'success',
    message: 'Product created successfully',
    data: product
  });
});

// @desc    Get all products with advanced filtering, sorting, and pagination
// @route   GET /api/products
exports.getProducts = asyncHandler(async (req, res, next) => {
  const {
    category,
    minPrice,
    maxPrice,
    inStock,
    search,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  const filter = {};

  if (category) filter.category = category;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (inStock === 'true') {
    filter.stock = { $gt: 0 };
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const sortOrderNum = sortOrder === 'desc' ? -1 : 1;
  const sortOptions = { [sortBy]: sortOrderNum };

  const products = await Product.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum);

  res.status(200).json({
    status: 'success',
    message: 'Products fetched successfully',
    data: products
  });
});

// @desc    Get a single product by ID
// @route   GET /api/products/:id
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category', 'name description');

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Product fetched successfully',
    data: product
  });
});

// @desc    Update a product
// @route   PATCH /api/products/:id
exports.updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      return next(new AppError('Category not found', 404));
    }
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Product updated successfully',
    data: product
  });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully',
    data: null
  });
});