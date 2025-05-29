import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "Roland RP-701 Digital Piano",
    price: 28900000,
    image: "https://azpiano.vn/wp-content/uploads/2019/08/dan-piano-dien-roland-rp-701.jpg",
    category: "Digital Piano",
    isNew: true,
    description: "Đàn piano điện Roland cao cấp, âm thanh chân thực",
    brand: "Roland",
    rating: 5,
    features: ["88 phím có trọng lượng", "128-note polyphony", "Bluetooth kết nối"]
  },
  {
    id: 2,
    name: "Boss Katana-50 MkII",
    price: 8490000,
    image: "https://www.boss.info/global/products/katana-50_mkii/images/katana-50_mkii_top.jpg",
    category: "Amplifier",
    isNew: true,
    description: "Amply guitar đa năng với 5 kênh âm thanh",
    brand: "Boss",
    rating: 4.5,
    features: ["50W", "5 amp characters", "60+ BOSS effects"]
  },
  {
    id: 3,
    name: "Taylor 214ce DLX",
    price: 35900000,
    image: "https://www.taylorguitars.com/sites/default/files/styles/guitar_desktop/public/214ce-dlx.png",
    category: "Acoustic Guitar",
    isNew: true,
    description: "Đàn guitar acoustic-electric cao cấp",
    brand: "Taylor",
    rating: 5,
    features: ["Gỗ sitka spruce", "Pickup ES2", "Cutaway"]
  },
  {
    id: 4,
    name: "Roland TD-07KV V-Drums",
    price: 42900000,
    image: "https://www.roland.com/global/products/td-07kv/images/td-07kv_top.jpg",
    category: "Electronic Drums",
    isNew: true,
    description: "Bộ trống điện tử chuyên nghiệp",
    brand: "Roland",
    rating: 4.8,
    features: ["Mesh-head pads", "TD-07 sound module", "Bluetooth audio"]
  }
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const NewArrivals = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-5">Sản Phẩm Mới</h1>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-3">
            <div className="card h-100 product-card">
              <div className="position-relative">
                <img 
                  src={product.image} 
                  className="card-img-top p-3" 
                  alt={product.name}
                  style={{
                    height: '250px',
                    objectFit: 'contain',
                    backgroundColor: '#f8f9fa'
                  }}
                />
                <span className="badge bg-danger position-absolute top-0 end-0 m-3">NEW</span>
                <span className="badge bg-dark position-absolute top-0 start-0 m-3">{product.brand}</span>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{ minHeight: '48px' }}>{product.name}</h5>
                <p className="card-text text-muted mb-2">{product.category}</p>
                <div className="mb-2">
                  {[...Array(5)].map((_, index) => (
                    <i 
                      key={index}
                      className={`bi bi-star${index < Math.floor(product.rating) ? '-fill' : index < product.rating ? '-half' : ''} text-warning`}
                    ></i>
                  ))}
                  <small className="text-muted ms-2">({product.rating})</small>
                </div>
                <h4 className="text-primary fw-bold mb-3">{formatPrice(product.price)}</h4>
                <p className="card-text text-muted" style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {product.description}
                </p>
                <button className="btn btn-primary mt-auto w-100">
                  <i className="bi bi-cart-plus me-2"></i>
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals; 