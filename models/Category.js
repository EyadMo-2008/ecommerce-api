const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  }
}, { timestamps: true });

categorySchema.pre('save', function(next) {
  if (this.name) {
    this.slug = this.name.split(' ').join('-').toLowerCase();
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);