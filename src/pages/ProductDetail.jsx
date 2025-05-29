import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  return (
    <div className="container mt-4" style={{ maxWidth: 900 }}>
      <div style={{ display: 'flex', gap: 32 }}>
        <div style={{ flex: 1 }}>
          <div style={{ width: '100%', height: 320, background: '#eee', borderRadius: 12 }}></div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ width: 60, height: 60, background: '#ddd', borderRadius: 8 }}></div>
            ))}
          </div>
        </div>
        <div style={{ flex: 2 }}>
          <h2>Chi tiết sản phẩm ID: {id}</h2>
          <div>Giá: ...</div>
          <div style={{ margin: '16px 0' }}>Mô tả sản phẩm...</div>
          <button className="btn btn-success">Thêm vào giỏ hàng</button>
        </div>
      </div>
      <div style={{ marginTop: 32 }}>
        <h4>Đánh giá & bình luận</h4>
        <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 16 }}>Chưa có đánh giá nào.</div>
      </div>
    </div>
  );
}

export default ProductDetail; 