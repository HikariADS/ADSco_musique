const mongoose = require('mongoose');
const Order = require('../models/Order');

async function clearOrders() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/adsco');
    console.log('✅ Đã kết nối với MongoDB');

    // Xóa tất cả orders
    await Order.deleteMany({});
    console.log('✅ Đã xóa tất cả orders');

    await mongoose.connection.close();
    console.log('✅ Đã đóng kết nối MongoDB');
  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
}

clearOrders(); 