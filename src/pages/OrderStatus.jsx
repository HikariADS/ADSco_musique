import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderStatus = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err.response?.data?.message || 'Không thể tải thông tin đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

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
        return status;
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
        <Link to="/orders" className="btn btn-primary">
          Quay lại danh sách đơn hàng
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Không tìm thấy đơn hàng
        </div>
        <Link to="/orders" className="btn btn-primary">
          Quay lại danh sách đơn hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="card-title mb-0">Chi tiết đơn hàng #{order._id}</h3>
                <span className={`badge bg-${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              <div className="timeline mb-4">
                {order.statusHistory.map((status, index) => (
                  <div key={index} className="timeline-item">
                    <div className={`timeline-badge bg-${getStatusColor(status.status)}`}></div>
                    <div className="timeline-content">
                      <h6 className="mb-1">{getStatusText(status.status)}</h6>
                      <small className="text-muted">
                        {new Date(status.timestamp).toLocaleString('vi-VN')}
                      </small>
                      {status.note && (
                        <p className="mb-0 mt-2">{status.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <h5 className="mb-3">Thông tin giao hàng</h5>
              <div className="row g-3">
                <div className="col-sm-6">
                  <p className="mb-1"><strong>Họ tên:</strong></p>
                  <p>{order.shippingInfo.fullName}</p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-1"><strong>Email:</strong></p>
                  <p>{order.shippingInfo.email}</p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-1"><strong>Số điện thoại:</strong></p>
                  <p>{order.shippingInfo.phone}</p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-1"><strong>Địa chỉ:</strong></p>
                  <p>
                    {order.shippingInfo.address}, {order.shippingInfo.ward}, {order.shippingInfo.district}, {order.shippingInfo.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Sản phẩm</h5>
              
              {order.items.map((item) => (
                <div key={item.productId} className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-muted">Số lượng: {item.quantity}</small>
                  </div>
                  <div className="text-end">
                    <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</div>
                  </div>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Tổng cộng</h5>
                <h5 className="mb-0">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</h5>
              </div>

              <div className="mt-4">
                <p className="mb-1"><strong>Phương thức thanh toán:</strong></p>
                <p>{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản ngân hàng'}</p>
                
                <p className="mb-1"><strong>Trạng thái thanh toán:</strong></p>
                <span className={`badge bg-${order.paymentStatus === 'paid' ? 'success' : 'warning'}`}>
                  {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Link to="/orders" className="btn btn-outline-primary w-100">
              <i className="bi bi-arrow-left me-2"></i>
              Quay lại danh sách đơn hàng
            </Link>
          </div>
        </div>
      </div>

      <style>
        {`
        .timeline {
          position: relative;
          padding: 20px 0;
        }
        
        .timeline:before {
          content: '';
          position: absolute;
          top: 0;
          left: 15px;
          height: 100%;
          width: 2px;
          background: #e9ecef;
        }
        
        .timeline-item {
          position: relative;
          padding-left: 40px;
          margin-bottom: 20px;
        }
        
        .timeline-badge {
          position: absolute;
          left: 7px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
        }
        
        .timeline-content {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 4px;
        }
        `}
      </style>
    </div>
  );
};

export default OrderStatus; 