const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id })
      .populate('items.productId', 'name price image');
    
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
      await cart.save();
    }

    res.json(cart.items);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng', error: error.message });
  }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Thiếu thông tin sản phẩm' });
    }

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId.toString()
    );

    if (existingItemIndex > -1) {
      // Update quantity if product exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item if product doesn't exist
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    // Return populated cart items
    cart = await Cart.findById(cart._id)
      .populate('items.productId', 'name price image');

    res.json({
      message: 'Thêm vào giỏ hàng thành công',
      items: cart.items
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Lỗi khi thêm vào giỏ hàng', error: error.message });
  }
});

// Update item quantity
router.put('/update/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Số lượng phải lớn hơn 0' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // Return populated cart items
    cart = await Cart.findById(cart._id)
      .populate('items.productId', 'name price image');

    res.json({
      message: 'Cập nhật số lượng thành công',
      items: cart.items
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật giỏ hàng', error: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
    }

    cart.items = cart.items.filter(item => 
      item.productId.toString() !== productId
    );

    await cart.save();

    // Return populated cart items
    cart = await Cart.findById(cart._id)
      .populate('items.productId', 'name price image');

    res.json({
      message: 'Xóa sản phẩm thành công',
      items: cart.items
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Lỗi khi xóa khỏi giỏ hàng', error: error.message });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
    }

    cart.items = [];
    await cart.save();

    res.json({
      message: 'Xóa giỏ hàng thành công',
      items: cart.items
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Lỗi khi xóa giỏ hàng', error: error.message });
  }
});

module.exports = router; 