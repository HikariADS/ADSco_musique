import React from 'react';
import { Link } from 'react-router-dom';

function Topbar() {
  return (
    <div className="topbar-sweelee py-1 px-2 d-flex justify-content-between align-items-center">
      <div className="topbar-left d-flex gap-3">
        <span className="topbar-hotline">Nhận Đôi Điểm Rewards Toàn Hệ Thống | Roland & Boss Đã Xuất Hiện</span>
      </div>
      <div className="topbar-right d-flex gap-3">
        <Link to="/contact" className="topbar-link">Liên Hệ</Link>
        <Link to="/store-locator" className="topbar-link">Tìm Cửa Hàng</Link>
      </div>
    </div>
  );
}

export default Topbar; 