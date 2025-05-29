const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Tạo đơn hàng mới
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingInfo, total, paymentMethod, note } = req.body;

    console.log('Received order data:', req.body);

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng không hợp lệ' });
    }

    // Validate items
    for (const item of items) {
      if (!item.productId || !item.name || !item.price || !item.quantity) {
        return res.status(400).json({ message: 'Thông tin sản phẩm không hợp lệ' });
      }
      if (item.quantity < 1) {
        return res.status(400).json({ message: 'Số lượng sản phẩm phải lớn hơn 0' });
      }
    }

    // Validate shipping info
    if (!shippingInfo || !shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      return res.status(400).json({ message: 'Thông tin giao hàng không đầy đủ' });
    }

    // Validate total
    if (typeof total !== 'number' || total < 0) {
      return res.status(400).json({ message: 'Tổng tiền không hợp lệ' });
    }

    // Create new order
    const order = new Order({
      userId: req.user._id,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      shippingInfo: {
        fullName: shippingInfo.fullName.trim(),
        email: shippingInfo.email.trim().toLowerCase(),
        phone: shippingInfo.phone.trim(),
        address: shippingInfo.address.trim(),
        city: shippingInfo.city,
        district: shippingInfo.district,
        ward: shippingInfo.ward
      },
      total,
      paymentMethod: paymentMethod || 'cod',
      note: note ? note.trim() : '',
      status: 'pending',
      paymentStatus: 'pending'
    });

    console.log('Created order:', order);

    await order.save();
    console.log('Order saved successfully');

    res.status(201).json({
      message: 'Đặt hàng thành công',
      _id: order._id,
      status: order.status,
      total: order.total
    });
  } catch (error) {
    console.error('Create order error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Dữ liệu không hợp lệ',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Lỗi khi tạo đơn hàng',
      error: error.message
    });
  }
});

// Lấy thông tin đơn hàng theo ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('items.productId', 'name price image');

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Kiểm tra quyền truy cập
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy danh sách đơn hàng của người dùng
router.get('/user/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.productId', 'name price image');
    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: error.message });
  }
});

// Lấy chi tiết đơn hàng
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.productId', 'name price image');

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Kiểm tra quyền truy cập
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập đơn hàng này' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order detail error:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin đơn hàng', error: error.message });
  }
});

// Tạo đơn hàng mới từ giỏ hàng
router.post('/create', auth, async (req, res) => {
  try {
    const { shippingInfo, paymentMethod, note } = req.body;
    
    console.log('Creating new order with data:', { shippingInfo, paymentMethod, note });
    
    // Lấy giỏ hàng của user
    const cart = await Cart.findOne({ userId: req.user._id })
      .populate('items.productId', 'name price image');

    console.log('Found cart:', cart);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng trống' });
    }

    // Tính tổng tiền
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);
    const shipping = 50000; // Phí vận chuyển cố định
    const total = subtotal + shipping;

    console.log('Calculated total:', { subtotal, shipping, total });

    // Tạo đơn hàng mới
    const order = new Order({
      userId: req.user._id,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        image: item.productId.image
      })),
      shippingInfo,
      total,
      paymentMethod,
      note,
      status: 'pending',
      statusHistory: [{
        status: 'pending',
        timestamp: new Date(),
        note: 'Đơn hàng mới được tạo'
      }]
    });

    console.log('Order object created:', order);

    await order.save();
    console.log('Order saved successfully with ID:', order._id);

    // Xóa giỏ hàng sau khi đặt hàng thành công
    cart.items = [];
    await cart.save();
    console.log('Cart cleared successfully');

    res.status(201).json({
      message: 'Đặt hàng thành công',
      orderId: order._id,
      status: order.status,
      total: order.total
    });
  } catch (error) {
    console.error('Create order error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error: error.message });
  }
});

// Cập nhật trạng thái đơn hàng (chỉ admin)
router.put('/:orderId/status', [auth, isAdmin], async (req, res) => {
  try {
    const { status, note } = req.body;

    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Cập nhật trạng thái
    order.status = status;
    if (note) {
      order.statusHistory[order.statusHistory.length - 1].note = note;
    }

    // Cập nhật trạng thái thanh toán nếu đơn hàng hoàn thành
    if (status === 'delivered' && order.paymentMethod === 'cod') {
      order.paymentStatus = 'paid';
    }

    await order.save();

    res.json({
      message: 'Cập nhật trạng thái thành công',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái đơn hàng', error: error.message });
  }
});

// Hủy đơn hàng
router.patch('/:orderId/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Kiểm tra quyền hủy đơn
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Không có quyền hủy đơn hàng này' });
    }

    // Chỉ cho phép hủy đơn hàng ở trạng thái pending
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Không thể hủy đơn hàng ở trạng thái này' });
    }

    order.status = 'cancelled';
    order.statusHistory.push({
      status: 'cancelled',
      timestamp: new Date(),
      note: 'Đơn hàng đã bị hủy bởi người dùng'
    });

    await order.save();

    res.json({ message: 'Hủy đơn hàng thành công', order });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Lỗi khi hủy đơn hàng' });
  }
});

// Lấy lịch sử trạng thái đơn hàng
router.get('/:orderId/status-history', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Kiểm tra quyền truy cập
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập đơn hàng này' });
    }

    res.json(order.statusHistory);
  } catch (error) {
    console.error('Get order status history error:', error);
    res.status(500).json({ message: 'Lỗi khi lấy lịch sử trạng thái', error: error.message });
  }
});

// Lấy tất cả đơn hàng (chỉ admin)
router.get('/', [auth, isAdmin], async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 