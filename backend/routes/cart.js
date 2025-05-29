const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id })
      .populate({
        path: 'items.product',
        select: 'name originalPrice salePrice price image brand category'
      });
    
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
      await cart.save();
    }

    // Transform cart items to include all necessary product data
    const transformedItems = await Promise.all(cart.items.map(async (item) => {
      if (!item.product) return null;
      
      const product = await Product.findById(item.product._id)
        .select('name originalPrice salePrice price image brand category');
      
      if (!product) return null;

      return {
        _id: item._id,
        product: {
          _id: product._id,
          name: product.name,
          originalPrice: product.originalPrice || product.price,
          salePrice: product.salePrice || product.price,
          price: product.price || (product.salePrice || product.originalPrice),
          image: product.image,
          brand: product.brand,
          category: product.category
        },
        quantity: item.quantity
      };
    }));

    // Filter out null items
    const validItems = transformedItems.filter(item => item !== null);

    res.json(validItems);
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
    const product = await Product.findById(productId)
      .select('name originalPrice salePrice price image brand category');
      
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
      item.product && item.product.toString() === productId.toString()
    );

    if (existingItemIndex > -1) {
      // Update quantity if product exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item if product doesn't exist
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    // Return transformed cart items
    cart = await Cart.findById(cart._id)
      .populate({
        path: 'items.product',
        select: 'name originalPrice salePrice price image brand category'
      });

    const transformedItems = cart.items.map(item => ({
      _id: item._id,
      product: {
        _id: item.product._id,
        name: item.product.name,
        originalPrice: item.product.originalPrice || item.product.price,
        salePrice: item.product.salePrice || item.product.price,
        price: item.product.price || (item.product.salePrice || item.product.originalPrice),
        image: item.product.image,
        brand: item.product.brand,
        category: item.product.category
      },
      quantity: item.quantity
    }));

    res.json({
      message: 'Thêm vào giỏ hàng thành công',
      items: transformedItems
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
      item.product && item.product.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // Return transformed cart items
    cart = await Cart.findById(cart._id)
      .populate({
        path: 'items.product',
        select: 'name originalPrice salePrice price image brand category'
      });

    const transformedItems = cart.items.map(item => ({
      _id: item._id,
      product: {
        _id: item.product._id,
        name: item.product.name,
        originalPrice: item.product.originalPrice || item.product.price,
        salePrice: item.product.salePrice || item.product.price,
        price: item.product.price || (item.product.salePrice || item.product.originalPrice),
        image: item.product.image,
        brand: item.product.brand,
        category: item.product.category
      },
      quantity: item.quantity
    }));

    res.json({
      message: 'Cập nhật số lượng thành công',
      items: transformedItems
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
      !item.product || item.product.toString() !== productId.toString()
    );

    await cart.save();

    // Return transformed cart items
    cart = await Cart.findById(cart._id)
      .populate({
        path: 'items.product',
        select: 'name originalPrice salePrice price image brand category'
      });

    const transformedItems = cart.items.map(item => ({
      _id: item._id,
      product: {
        _id: item.product._id,
        name: item.product.name,
        originalPrice: item.product.originalPrice || item.product.price,
        salePrice: item.product.salePrice || item.product.price,
        price: item.product.price || (item.product.salePrice || item.product.originalPrice),
        image: item.product.image,
        brand: item.product.brand,
        category: item.product.category
      },
      quantity: item.quantity
    }));

    res.json({
      message: 'Xóa sản phẩm thành công',
      items: transformedItems
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
      items: []
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Lỗi khi xóa giỏ hàng', error: error.message });
  }
});

module.exports = router; 