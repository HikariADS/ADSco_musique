import React, { useState, useEffect } from 'react';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Lỗi khi tải danh sách sản phẩm');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Lỗi khi xóa sản phẩm');
      }

      alert('Xóa sản phẩm thành công!');
      fetchProducts(); // Refresh danh sách
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Quản lý sản phẩm</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString('vi-VN')}đ</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Xóa
                  </button>
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => window.location.href = `/admin/edit-product/${product.id}`}
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement; 