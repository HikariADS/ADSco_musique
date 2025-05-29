import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Kiểm tra quyền admin
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  // Lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/all');
        setOrders(response.data);
      } catch (err) {
        setError('Không thể tải danh sách đơn hàng');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`/api/orders/${orderId}/status`, { status: newStatus });
      
      // Cập nhật state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      setError('Không thể cập nhật trạng thái đơn hàng');
      console.error('Error updating order status:', err);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Quản lý đơn hàng</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  <div>{order.shippingInfo.fullName}</div>
                  <small className="text-muted">{order.shippingInfo.phone}</small>
                </td>
                <td>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(order.total)}
                </td>
                <td>
                  <span className={`badge bg-${
                    order.status === 'pending' ? 'warning' :
                    order.status === 'processing' ? 'info' :
                    order.status === 'shipped' ? 'primary' :
                    order.status === 'delivered' ? 'success' :
                    'danger'
                  }`}>
                    {order.status === 'pending' ? 'Chờ xử lý' :
                     order.status === 'processing' ? 'Đang xử lý' :
                     order.status === 'shipped' ? 'Đang giao' :
                     order.status === 'delivered' ? 'Đã giao' :
                     'Đã hủy'}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleUpdateStatus(order._id, 'processing')}
                      disabled={order.status !== 'pending'}
                    >
                      Xác nhận
                    </button>
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => handleUpdateStatus(order._id, 'shipped')}
                      disabled={order.status !== 'processing'}
                    >
                      Giao hàng
                    </button>
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handleUpdateStatus(order._id, 'delivered')}
                      disabled={order.status !== 'shipped'}
                    >
                      Hoàn thành
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleUpdateStatus(order._id, 'cancelled')}
                      disabled={['delivered', 'cancelled'].includes(order.status)}
                    >
                      Hủy
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders; 