const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Import Product model (sẽ tạo sau)
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get new arrival products
router.get('/new', async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get sale products
router.get('/sale', async (req, res) => {
  try {
    const products = await Product.find({ isDeal: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new product (admin only)
router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error: error.message });
  }
});

// Update product (admin only)
router.put('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: error.message });
  }
});

// Delete product (admin only)
router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json({ message: 'Đã xóa sản phẩm thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error: error.message });
  }
});

// Search products
router.get('/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm', error: error.message });
  }
});

// Filter products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lọc sản phẩm theo danh mục', error: error.message });
  }
});

// PUT /api/products/manage-sale
router.put('/manage-sale', auth, async (req, res) => {
  try {
    // Reset all products to not on sale
    await Product.updateMany({}, { isOnSale: false });

    // Get top 8 products with highest ratings
    const topProducts = await Product.find()
      .sort({ rating: -1 })
      .limit(8);

    // Set these products on sale with discounts
    const discounts = [30, 25, 20, 20, 15, 15, 15, 15]; // Different discount levels
    
    for (let i = 0; i < topProducts.length; i++) {
      const product = topProducts[i];
      const discount = discounts[i];
      const salePrice = Math.round(product.originalPrice * (1 - discount/100));
      
      await Product.findByIdAndUpdate(product._id, {
        isOnSale: true,
        discount: discount,
        salePrice: salePrice
      });
    }

    res.json({ message: 'Sale products updated successfully' });
  } catch (error) {
    console.error('Error managing sale products:', error);
    res.status(500).json({ message: 'Error managing sale products' });
  }
});

module.exports = router; 