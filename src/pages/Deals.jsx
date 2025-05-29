import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "Fender Player Stratocaster",
    originalPrice: 25900000,
    salePrice: 22900000,
    discount: 12,
    image: "https://www.fmicassets.com/Damroot/ZoomJpg/10001/0144502500_gtr_frt_001_rr.jpg",
    category: "Electric Guitar",
    brand: "Fender",
    rating: 5,
    description: "Đàn guitar điện Fender Player Series, thân gỗ alder, cần maple",
    features: ["3 Single-coil pickups", "22 Frets", "Modern C neck"]
  },
  {
    id: 2,
    name: "Yamaha P-125 Digital Piano",
    originalPrice: 19900000,
    salePrice: 16900000,
    discount: 15,
    image: "https://yamaha.scene7.com/is/image/yamahaprod/P-125B_thumbnail",
    category: "Digital Piano",
    brand: "Yamaha",
    rating: 4.8,
    description: "Đàn piano điện Yamaha P-125 với âm thanh CFX concert grand",
    features: ["88 weighted keys", "Pure CF Sound Engine", "Dual/Split modes"]
  },
  {
    id: 3,
    name: "Shure SM7B Microphone",
    originalPrice: 12900000,
    salePrice: 9900000,
    discount: 23,
    image: "https://www.shure.com/cdn-cgi/image/width=1200,quality=100,format=auto/damroot/product_image/sm7b_primary_front_l.jpg",
    category: "Microphone",
    brand: "Shure",
    rating: 5,
    description: "Micro thu âm chuyên nghiệp Shure SM7B",
    features: ["Cardioid pattern", "Built-in pop filter", "Bass roll-off"]
  },
  {
    id: 4,
    name: "Roland TD-17KVX V-Drums",
    originalPrice: 52900000,
    salePrice: 45900000,
    discount: 13,
    image: "https://www.roland.com/global/products/td-17kvx/images/td-17kvx_top.jpg",
    category: "Electronic Drums",
    brand: "Roland",
    rating: 4.9,
    description: "Bộ trống điện tử Roland V-Drums TD-17KVX cao cấp",
    features: ["Mesh-head pads", "Prismatic Sound Modeling", "Bluetooth"]
  }
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const Deals = ({ handleAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Ưu Đãi Đặc Biệt</h1>
        <p className="text-muted fs-5">Những ưu đãi tốt nhất dành cho bạn</p>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 product-card shadow-sm">
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
                <div className="position-absolute top-0 start-0 m-3">
                  <span className="badge bg-danger">-{product.discount}%</span>
                </div>
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-dark">{product.brand}</span>
                </div>
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
                <div className="mb-3">
                  <h4 className="text-danger fw-bold mb-0">
                    {formatPrice(product.salePrice)}
                  </h4>
                  <small className="text-muted text-decoration-line-through">
                    {formatPrice(product.originalPrice)}
                  </small>
                </div>
                <p className="card-text text-muted" style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {product.description}
                </p>
                <div className="mt-auto">
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Thêm vào giỏ
                    </button>
                    <button className="btn btn-outline-secondary">
                      <i className="bi bi-eye me-2"></i>
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <div className="progress" style={{ height: '5px' }}>
                  <div 
                    className="progress-bar bg-danger" 
                    role="progressbar" 
                    style={{ width: '75%' }} 
                    aria-valuenow="75" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
                <small className="text-danger">
                  <i className="bi bi-fire me-1"></i>
                  Đã bán 75%
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals; 