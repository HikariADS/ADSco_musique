import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdateRole = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/update-role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          role: 'admin'
        })
      });
      
      if (!response.ok) {
        throw new Error('Lỗi khi cập nhật role');
      }

      const data = await response.json();
      alert('Cập nhật role thành công!');
      // Reload để cập nhật state
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    // Chuyển hướng đến trang thêm sản phẩm
    navigate('/admin/add-product');
  };

  const handleManageProducts = () => {
    // Chuyển hướng đến trang quản lý sản phẩm
    navigate('/admin/products');
  };

  const handleManageOrders = () => {
    // Chuyển hướng đến trang quản lý đơn hàng
    navigate('/admin/orders');
  };

  return (
    <div className="container mt-4">
      <h2>Quản trị hệ thống</h2>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1, background: '#f8f9fa', borderRadius: 8, padding: 24 }}>
          <h5>Quản lý sản phẩm</h5>
          <div className="d-flex flex-column gap-2">
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleAddProduct}
            >
              Thêm sản phẩm
            </button>
            <button 
              className="btn btn-info btn-sm"
              onClick={handleManageProducts}
            >
              Danh sách sản phẩm
            </button>
          </div>
        </div>
        <div style={{ flex: 1, background: '#f8f9fa', borderRadius: 8, padding: 24 }}>
          <h5>Quản lý đơn hàng</h5>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleManageOrders}
          >
            Xem đơn hàng
          </button>
        </div>
        <div style={{ flex: 1, background: '#f8f9fa', borderRadius: 8, padding: 24 }}>
          <h5>Quản lý người dùng</h5>
          <button 
            className="btn btn-warning btn-sm"
            onClick={() => {
              const userId = prompt('Nhập User ID để cập nhật thành Admin:');
              if (userId) handleUpdateRole(userId);
            }}
            disabled={loading}
          >
            {loading ? 'Đang cập nhật...' : 'Cập nhật Role'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin; 