import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import defaultAvatar from '../assets/default-avatar.png';

function Navbar({ user, onLogout, cartCount }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      {/* Topbar */}
      <div className="topbar-sweelee py-1 px-2 d-flex justify-content-between align-items-center">
        <div className="topbar-left d-flex gap-3">
          <span className="topbar-hotline">Nhận Đôi Điểm Rewards Toàn Hệ Thống | Roland & Boss Đã Xuất Hiện</span>
        </div>
        <div className="topbar-right d-flex gap-3">
          <Link to="/contact" className="topbar-link">Liên Hệ</Link>
          <Link to="/store-locator" className="topbar-link">Tìm Cửa Hàng</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar-sweelee navbar-expand-lg px-2">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Menu button mobile */}
          <button className="navbar-toggler" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Logo center */}
          <Link className="navbar-brand mx-auto" to="/">
            <img src={logo} alt="Swee Lee" height="40" />
          </Link>

          {/* Search bar */}
          <form className="navbar-search mx-3 flex-grow-1 d-none d-lg-block">
            <input className="form-control" type="search" placeholder="Tìm kiếm sản phẩm..." />
          </form>

          {/* Icon */}
          <div className="navbar-icons d-flex gap-3 align-items-center">
            <Link to="/wishlist" className="icon-link"><i className="bi bi-heart"></i></Link>
            <Link to="/cart" className="icon-link">
              <i className="bi bi-cart"></i>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            
            {user ? (
              <div className="d-flex gap-2 align-items-center">
                <Link to="/profile" className="user-profile">
                  <img 
                    src={user.avatar || defaultAvatar}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <span className="user-name">{user.name}</span>
                </Link>
                <button onClick={onLogout} className="logout-btn" title="Đăng xuất">
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            ) : (
              <div className="auth-buttons d-flex gap-2">
                <Link to="/login" className="btn btn-outline-dark btn-sm">Đăng nhập</Link>
                <Link to="/register" className="btn btn-dark btn-sm">Đăng ký</Link>
              </div>
            )}
          </div>
        </div>

        {/* Menu dưới logo (menu đa cấp) */}
        <div className="navbar-menu-bar d-none d-lg-flex justify-content-center gap-4 py-2">
          <Link to="/new-arrivals" className="navbar-menu-link">Có Gì Mới</Link>
          <Link to="/deals" className="navbar-menu-link">Deals</Link>
          <Link to="/brands" className="navbar-menu-link">Thương Hiệu</Link>
          <Link to="/products" className="navbar-menu-link">Sản Phẩm</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
