const mongoose = require('mongoose');
const Product = require('./models/Product');
const products = require('./data/products');

async function importProducts() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/adsco');
    console.log('Đã kết nối với MongoDB');

    // Xóa tất cả sản phẩm cũ
    await Product.deleteMany({});
    console.log('Đã xóa sản phẩm cũ');

    // Import sản phẩm mới
    const result = await Product.insertMany(products);
    console.log('Đã import dữ liệu sản phẩm thành công');
    console.log(`Số sản phẩm đã import: ${result.length}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
}

importProducts(); 
