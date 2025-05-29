import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Cấu hình axios
axios.defaults.baseURL = 'http://localhost:5000';

// Thêm interceptor để xử lý token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý response
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error') {
      console.error('Network Error - Kiểm tra kết nối server');
      alert('Không thể kết nối đến server. Vui lòng thử lại sau.');
    }
    return Promise.reject(error);
  }
);

const Checkout = ({ cart, onClearCart }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    district: '',
    ward: '',
    paymentMethod: 'cod',
    note: ''
  });

  // Tính tổng tiền
  const getItemPrice = (item) => {
    if (!item?.product) {
      return 0;
    }
    const product = item.product;
    
    // First try to get salePrice, if not available use originalPrice, then price
    if (typeof product.salePrice === 'number') {
      return product.salePrice;
    } else if (typeof product.originalPrice === 'number') {
      return product.originalPrice;
    } else if (typeof product.price === 'number') {
      return product.price;
    }
    return 0;
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = getItemPrice(item);
    return sum + (price * (item.quantity || 1));
  }, 0);
  const shipping = cart.length > 0 ? 50000 : 0; // Phí vận chuyển cố định
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Kiểm tra giỏ hàng
      if (!cart || cart.length === 0) {
        throw new Error('Giỏ hàng trống');
      }

      // Gọi API tạo đơn hàng
      const response = await axios.post('/api/orders', {
        items: cart.map(item => ({
          productId: item.product._id,
          name: item.product.name,
          price: getItemPrice(item),
          quantity: item.quantity,
          image: item.product.image
        })),
        shippingInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          ward: formData.ward
        },
        total: total,
        paymentMethod: formData.paymentMethod,
        note: formData.note
      });

      // Xóa giỏ hàng sau khi đặt hàng thành công
      onClearCart();

      // Chuyển hướng đến trang chi tiết đơn hàng
      navigate(`/order-status/${response.data._id}`);
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi đặt hàng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">Thông tin giao hàng</h3>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Số điện thoại</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="city" className="form-label">Tỉnh/Thành phố</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="district" className="form-label">Quận/Huyện</label>
                    <input
                      type="text"
                      className="form-control"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="ward" className="form-label">Phường/Xã</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ward"
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phương thức thanh toán</label>
                  <div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="cod">
                        Thanh toán khi nhận hàng (COD)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="banking"
                        name="paymentMethod"
                        value="banking"
                        checked={formData.paymentMethod === 'banking'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="banking">
                        Chuyển khoản ngân hàng
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="note" className="form-label">Ghi chú</label>
                  <textarea
                    className="form-control"
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Đang xử lý...
                    </>
                  ) : (
                    'Đặt hàng'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">Đơn hàng của bạn</h3>

              {cart.map((item) => (
                <div key={item.product._id} className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-0">{item.product.name}</h6>
                    <small className="text-muted">Số lượng: {item.quantity}</small>
                  </div>
                  <div className="text-end">
                    <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getItemPrice(item) * item.quantity)}</div>
                  </div>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shipping)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Tổng cộng</h5>
                <h5 className="mb-0 text-danger">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 