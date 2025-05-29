import React from 'react';
import guitarImg1 from '../assets/guitar1.webp';
import guitarImg2 from '../assets/guitar2.webp';
import guitarImg3 from '../assets/guitar3.webp';
import guitarImg4 from '../assets/guitar4.webp';
import pianoImg1 from '../assets/piano1.webp';
import pianoImg2 from '../assets/piano2.webp';
import pianoImg3 from '../assets/piano3.webp';
import pianoImg4 from '../assets/piano4.webp';
import drumImg1 from '../assets/drum1.webp';
import drumImg2 from '../assets/drum2.webp';
import drumImg3 from '../assets/drum3.webp';
import drumImg4 from '../assets/drum4.webp';
import drumImg5 from '../assets/drum5.webp';
import toyImg1 from '../assets/toy1.webp';
import toyImg2 from '../assets/toy2.webp';
import toyImg3 from '../assets/toy3.webp';
import toyImg4 from '../assets/toy4.webp';
import toyImg5 from '../assets/toy5.webp';
import toyImg6 from '../assets/toy6.webp';
import toyImg7 from '../assets/toy7.webp';

const allProducts = [
  { name: 'Đàn Guitar 1', price: '95.000.000đ', img: guitarImg1 },
  { name: 'Đàn Guitar 2', price: '89.000.000đ', img: guitarImg2 },
  { name: 'Đàn Guitar 3', price: '75.000.000đ', img: guitarImg3 },
  { name: 'Đàn Guitar 4', price: '60.000.000đ', img: guitarImg4 },
  { name: 'Đàn Piano 1', price: '1.200.000.000đ', img: pianoImg1 },
  { name: 'Đàn Piano 2', price: '1.000.000.000đ', img: pianoImg2 },
  { name: 'Đàn Piano 3', price: '1.100.000.000đ', img: pianoImg3 },
  { name: 'Đàn Piano 4', price: '1.050.000.000đ', img: pianoImg4 },
  { name: 'Bộ Trống 1', price: '80.000.000đ', img: drumImg1 },
  { name: 'Bộ Trống 2', price: '78.000.000đ', img: drumImg2 },
  { name: 'Bộ Trống 3', price: '70.000.000đ', img: drumImg3 },
  { name: 'Bộ Trống 4', price: '65.000.000đ', img: drumImg4 },
  { name: 'Bộ Trống 5', price: '60.000.000đ', img: drumImg5 },
  { name: 'Phụ kiện 1', price: '2.000.000đ', img: toyImg1 },
  { name: 'Phụ kiện 2', price: '2.000.000đ', img: toyImg2 },
  { name: 'Phụ kiện 3', price: '2.000.000đ', img: toyImg3 },
  { name: 'Phụ kiện 4', price: '2.000.000đ', img: toyImg4 },
  { name: 'Phụ kiện 5', price: '2.000.000đ', img: toyImg5 },
  { name: 'Phụ kiện 6', price: '2.000.000đ', img: toyImg6 },
  { name: 'Phụ kiện 7', price: '2.000.000đ', img: toyImg7 },
];

function Dashboard({ user }) {
  return (
    <div className="container mt-4">
      <div style={{ background: '#f8f9fa', borderRadius: 16, padding: 32, textAlign: 'center', marginBottom: 32 }}>
        <h2>Chào mừng {user?.name || user?.email}!</h2>
        <p>Chúng tôi sẵn sàng hỗ trợ bạn trong mọi giải pháp âm nhạc.</p>
      </div>
      <h3 className="mb-3">Tất cả sản phẩm nổi bật</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
        {allProducts.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
              padding: 20,
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              border: '1px solid #f0f0f0',
              minHeight: 280
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
            }}
          >
            <img
              src={p.img}
              alt={p.name}
              style={{
                width: '100%',
                height: 140,
                objectFit: 'contain',
                background: '#f6f6f6',
                borderRadius: 8,
                marginBottom: 8,
                padding: 8
              }}
            />
            <div style={{ fontWeight: 600 }}>{p.name}</div>
            <div style={{ color: '#0d8abc', fontWeight: 700, margin: '8px 0' }}>{p.price}</div>
            <button className="btn btn-primary btn-sm">Xem chi tiết</button>
          </div>
        ))}
      </div>
      <div style={{ margin: '48px 0 16px 0', background: '#f8f9fa', borderRadius: 12, padding: 32, textAlign: 'center' }}>
        <h4>Lịch sử mua hàng (mẫu)</h4>
        <div>Chưa có đơn hàng nào.</div>
      </div>
    </div>
  );
}

export default Dashboard;
