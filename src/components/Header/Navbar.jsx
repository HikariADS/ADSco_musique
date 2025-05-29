import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import defaultAvatar from '../../assets/default-avatar.png';

function Navbar({ user, onLogout, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="navbar-sweelee navbar-expand-lg px-2">
      <div className="container-fluid">
        {/* Mobile menu button */}
        <button 
          className="navbar-toggler" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Swee Lee" height="40" />
        </Link>

        {/* Desktop Search */}
        <form className="navbar-search mx-3 flex-grow-1 d-none d-lg-block">
          <input 
            className="form-control" 
            type="search" 
            placeholder="Tìm kiếm sản phẩm..." 
            aria-label="Search"
          />
        </form>

        {/* Mobile Search Toggle */}
        <button 
          className="btn d-lg-none" 
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Toggle search"
        >
          <i className="bi bi-search"></i>
        </button>

        {/* Navigation Icons */}
        <div className="navbar-icons d-flex gap-3 align-items-center">
          <Link to="/wishlist" className="icon-link" aria-label="Wishlist">
            <i className="bi bi-heart"></i>
          </Link>
          <Link to="/cart" className="icon-link position-relative" aria-label="Cart">
            <i className="bi bi-cart"></i>
            {cartCount > 0 && (
              <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="d-flex gap-2 align-items-center">
              <Link to="/profile" className="user-profile">
                <img 
                  src={user.avatar || defaultAvatar}
                  alt={user.name}
                  className="user-avatar"
                />
                <span className="user-name d-none d-sm-inline">{user.name}</span>
              </Link>
              <button 
                onClick={onLogout} 
                className="logout-btn" 
                title="Đăng xuất"
                aria-label="Logout"
              >
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

      {/* Mobile Search Form */}
      {searchOpen && (
        <form className="mobile-search-form p-2 d-lg-none">
          <input 
            className="form-control" 
            type="search" 
            placeholder="Tìm kiếm sản phẩm..." 
            aria-label="Search"
          />
        </form>
      )}

      {/* Navigation Menu */}
      <div className={`navbar-collapse ${menuOpen ? 'show' : ''}`}>
        <div className="navbar-menu-bar justify-content-center gap-4 py-2">
          <Link to="/new-arrivals" className="navbar-menu-link">Có Gì Mới</Link>
          <Link to="/deals" className="navbar-menu-link">Deals</Link>
          <Link to="/brands" className="navbar-menu-link">Thương Hiệu</Link>
          <Link to="/products" className="navbar-menu-link">Sản Phẩm</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 