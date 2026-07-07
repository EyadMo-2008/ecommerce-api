require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

const seedDB = async () => {
  try {
    await connectDB();

    console.log('Cleaning up database...');
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    console.log('Database cleaned!');

    console.log('Seeding categories...');
    const createdCategories = await Category.create([
      { name: 'Electronics', description: 'Gadgets, devices, and tech accessories' },
      { name: 'Clothing', description: 'Apparel, shoes, and fashion items' },
      { name: 'Books', description: 'Fiction, non-fiction, and educational books' }
    ]);

    console.log('Seeding products...');
    const createdProducts = await Product.create([
      { name: 'Smartphone Pro', description: 'Latest flagship smartphone', price: 999, category: createdCategories[0]._id, stock: 50, images: ['phone1.jpg'] },
      { name: 'Wireless Earbuds', description: 'Noise-canceling bluetooth earbuds', price: 149, category: createdCategories[0]._id, stock: 120, images: ['buds1.jpg'] },
      { name: 'Classic Leather Jacket', description: '100% genuine leather jacket', price: 199, category: createdCategories[1]._id, stock: 25, images: ['jacket1.jpg'] },
      { name: 'Running Sneakers', description: 'Lightweight comfortable running shoes', price: 89, category: createdCategories[1]._id, stock: 60, images: ['shoes1.jpg'] },
      { name: 'Node.js Complete Guide', description: 'Learn backend development from scratch', price: 39, category: createdCategories[2]._id, stock: 200, images: ['book1.jpg'] },
      { name: 'Sci-Fi Novel', description: 'An amazing space adventure story', price: 15, category: createdCategories[2]._id, stock: 80, images: ['book2.jpg'] }
    ]);

    console.log('\nSeeding Summary:');
    console.log(`  Categories: ${createdCategories.length}`);
    console.log(`  Products: ${createdProducts.length}`);
    console.log('  Categories breakdowns:');
    
    createdCategories.forEach(c => {
      const count = createdProducts.filter(p => p.category && p.category.toString() === c._id.toString()).length;
      console.log(`    - ${c.name}: ${count} products`);
    });

    console.log('\nSeeding complete successfully!');

  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

seedDB();