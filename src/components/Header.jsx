import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Header = ({ cartItemCount }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    if (user) {
      fetchPendingOrders();
    }
  }, [user]);

  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get('/api/orders/user/orders');
      const pending = response.data.filter(order => 
        order.status === 'pending' || order.status === 'processing' || order.status === 'shipping'
      ).length;
      setPendingOrders(pending);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/assets/logo.png" alt="ADSco" height="40" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">
                  Thương hiệu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deals">
                  Khuyến mãi
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              {user ? (
                <>
                  <Link to="/orders" className="btn btn-outline-primary position-relative me-2">
                    <i className="bi bi-box-seam"></i>
                    {pendingOrders > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                        {pendingOrders}
                      </span>
                    )}
                  </Link>
                  <Link to="/cart" className="btn btn-outline-primary position-relative me-2">
                    <i className="bi bi-cart3"></i>
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-primary dropdown-toggle"
                      type="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-circle me-1"></i>
                      {user.name || 'Tài khoản'}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          <i className="bi bi-person me-2"></i>
                          Thông tin tài khoản
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/orders">
                          <i className="bi bi-box-seam me-2"></i>
                          Đơn hàng của tôi
                          {pendingOrders > 0 && (
                            <span className="badge bg-warning text-dark ms-2">
                              {pendingOrders}
                            </span>
                          )}
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div style={{ height: '60px' }}></div>
    </header>
  );
};

export default Header; 