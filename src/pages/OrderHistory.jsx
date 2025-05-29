import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/user/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Có lỗi xảy ra khi tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipping':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'processing':
        return 'Đang xử lý';
      case 'shipping':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Chưa có đơn hàng nào</h2>
        <p className="text-muted mb-4">Bạn chưa có đơn hàng nào trong lịch sử mua sắm</p>
        <Link to="/products" className="btn btn-primary">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-page bg-light">
      <div className="container py-5">
        <h1 className="mb-4">Lịch sử đơn hàng</h1>

        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">
                      Đơn hàng #{order._id}
                    </h5>
                    <span className={`badge bg-${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <h6>Thông tin giao hàng</h6>
                      <p className="mb-1">Người nhận: {order.shippingInfo.fullName}</p>
                      <p className="mb-1">Số điện thoại: {order.shippingInfo.phone}</p>
                      <p className="mb-1">
                        Địa chỉ: {order.shippingInfo.address}, {order.shippingInfo.ward}, {order.shippingInfo.district}, {order.shippingInfo.city}
                      </p>
                    </div>

                    <div className="col-md-6">
                      <h6>Thông tin thanh toán</h6>
                      <p className="mb-1">
                        Phương thức: {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : order.paymentMethod}
                      </p>
                      <p className="mb-1">
                        Trạng thái: {order.paymentStatus === 'pending' ? 'Chưa thanh toán' : 'Đã thanh toán'}
                      </p>
                      <p className="mb-1">Tổng tiền: {formatPrice(order.total)}</p>
                    </div>
                  </div>

                  <hr />

                  <h6>Sản phẩm</h6>
                  {order.items.map((item) => (
                    <div key={item._id} className="d-flex align-items-center mb-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="me-3"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{item.name}</h6>
                        <small className="text-muted">
                          {formatPrice(item.price)} x {item.quantity}
                        </small>
                      </div>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}

                  <div className="mt-3">
                    <Link
                      to={`/order-status/${order._id}`}
                      className="btn btn-outline-primary"
                    >
                      Chi tiết đơn hàng
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .orders-page {
          min-height: 100vh;
        }
        .card {
          transition: transform 0.2s;
        }
        .card:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default OrderHistory; 