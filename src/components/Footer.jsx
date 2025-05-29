import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row g-4">
          {/* About Section */}
          <div className="col-md-3">
            <h5 className="mb-3">Về Chúng Tôi</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-white-50">Giới Thiệu</Link></li>
              <li><Link to="/store-locator" className="text-white-50">Tìm Cửa Hàng</Link></li>
              <li><Link to="/contact" className="text-white-50">Liên Hệ</Link></li>
              <li><Link to="/blog" className="text-white-50">Blog</Link></li>
              <li><Link to="/careers" className="text-white-50">Tuyển Dụng</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3">
            <h5 className="mb-3">Chăm Sóc Khách Hàng</h5>
            <ul className="list-unstyled">
              <li><Link to="/help" className="text-white-50">Trung Tâm Trợ Giúp</Link></li>
              <li><Link to="/shipping" className="text-white-50">Vận Chuyển & Giao Hàng</Link></li>
              <li><Link to="/returns" className="text-white-50">Đổi Trả & Hoàn Tiền</Link></li>
              <li><Link to="/warranty" className="text-white-50">Bảo Hành</Link></li>
              <li><Link to="/faq" className="text-white-50">Câu Hỏi Thường Gặp</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-3">
            <h5 className="mb-3">Danh Mục</h5>
            <ul className="list-unstyled">
              <li><Link to="/category/guitars" className="text-white-50">Guitar & Bass</Link></li>
              <li><Link to="/category/amplifiers" className="text-white-50">Amplifier & Monitor</Link></li>
              <li><Link to="/category/pedals" className="text-white-50">Pedal & Pedalboard</Link></li>
              <li><Link to="/category/accessories" className="text-white-50">Phụ Kiện</Link></li>
              <li><Link to="/category/drums" className="text-white-50">Trống & Bộ Gõ</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="col-md-3">
            <h5 className="mb-3">Kết nối với chúng tôi</h5>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="row mt-5 pt-4 border-top border-secondary">
          <div className="col-md-6">
            <p className="text-white-50 mb-0">
              © 2024 Hoang Brothers. Tất cả quyền được bảo lưu.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="payment-methods">
              <i className="bi bi-credit-card me-2"></i>
              <i className="bi bi-paypal me-2"></i>
              <i className="bi bi-wallet2 me-2"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
