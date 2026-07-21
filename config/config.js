const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_db',
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development'
};
