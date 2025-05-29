import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';

// Import shopping images
import shopping1 from '../assets/shopping (1).webp';
import shopping2 from '../assets/shopping (2).webp';
import shopping3 from '../assets/shopping (3).webp';
import shopping4 from '../assets/shopping (4).webp';
import shopping5 from '../assets/shopping (5).webp';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const NewArrivals = ({ handleAddToCart }) => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  
  // Get first 4 products for new arrivals
  const allNewProducts = products.slice(0, 4);
  
  // Filter products based on selected brand
  const filteredProducts = selectedBrand === 'all' 
    ? allNewProducts 
    : allNewProducts.filter(product => product.brand.toLowerCase() === selectedBrand.toLowerCase());

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Có Gì Mới</h1>
        <p className="text-muted fs-5">Khám phá những sản phẩm mới nhất của chúng tôi</p>
      </div>

      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <button 
            className={`btn ${selectedBrand === 'all' ? 'btn-dark' : 'btn-outline-dark'} px-4`}
            onClick={() => handleBrandFilter('all')}
          >
            Tất cả
          </button>
          <button 
            className={`btn ${selectedBrand === 'fender' ? 'btn-dark' : 'btn-outline-dark'} px-4`}
            onClick={() => handleBrandFilter('fender')}
          >
            Fender
          </button>
          <button 
            className={`btn ${selectedBrand === 'yamaha' ? 'btn-dark' : 'btn-outline-dark'} px-4`}
            onClick={() => handleBrandFilter('yamaha')}
          >
            Yamaha
          </button>
          <button 
            className={`btn ${selectedBrand === 'gibson' ? 'btn-dark' : 'btn-outline-dark'} px-4`}
            onClick={() => handleBrandFilter('gibson')}
          >
            Gibson
          </button>
          <button 
            className={`btn ${selectedBrand === 'pearl' ? 'btn-dark' : 'btn-outline-dark'} px-4`}
            onClick={() => handleBrandFilter('pearl')}
          >
            Pearl
          </button>
          <button 
            className={`btn ${selectedBrand === 'traditional' ? 'btn-dark' : 'btn-outline-dark'} px-4`}
            onClick={() => handleBrandFilter('traditional')}
          >
            Nhạc cụ dân tộc
          </button>
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 product-card shadow-sm">
                <div className="position-relative">
                  <img 
                    src={[shopping1, shopping2, shopping3, shopping4][index % 4]} 
                    className="card-img-top p-3" 
                    alt={product.name}
                    style={{
                      height: '250px',
                      objectFit: 'contain',
                      backgroundColor: '#f8f9fa'
                    }}
                  />
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-success">Mới</span>
                  </div>
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-dark">{product.brand}</span>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="small text-muted mb-1">{product.category}</div>
                  <h5 className="card-title fw-bold" style={{ minHeight: '48px' }}>{product.name}</h5>
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
                    <h4 className="fw-bold mb-0">
                      {formatPrice(product.originalPrice)}
                    </h4>
                  </div>
                  <p className="card-text text-muted" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '48px'
                  }}>
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-dark"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Mua ngay
                      </button>
                      <Link 
                        to={`/product/${product._id}`}
                        className="btn btn-outline-secondary"
                      >
                        <i className="bi bi-eye me-2"></i>
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h3 className="text-muted">Không tìm thấy sản phẩm nào</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;