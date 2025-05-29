require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const products = require('../data/products');
const Product = require('../models/Product');

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/adsco', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected for import'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Dữ liệu sản phẩm
const importProducts = async () => {
  try {
    // Xóa dữ liệu cũ
    await Product.deleteMany();
    
    // Import dữ liệu mới
    const importedProducts = await Product.insertMany(products);
    
    console.log('✅ Products imported successfully:', importedProducts.length, 'items');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing products:', error);
    process.exit(1);
  }
};

importProducts(); 