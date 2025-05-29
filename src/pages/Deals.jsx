import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';

// Import shopping images
import shopping6 from '../assets/shopping (6).webp';
import shopping7 from '../assets/shopping (7).webp';
import shopping8 from '../assets/shopping (8).webp';
import shopping9 from '../assets/shopping (9).webp';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const Deals = ({ handleAddToCart }) => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  
  // Get products 5-8 for deals with mixed stock status
  const allDealProducts = products
    .slice(4, 8)
    .map(product => ({
      ...product,
      quantity: Math.random() > 0.5 ? product.quantity : 0 // Randomly set some products as out of stock
    }));
  
  // Filter products based on selected brand
  const filteredProducts = selectedBrand === 'all' 
    ? allDealProducts 
    : allDealProducts.filter(product => product.brand.toLowerCase() === selectedBrand.toLowerCase());

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Khuyến Mãi Hot</h1>
        <p className="text-muted fs-5">Những ưu đãi tốt nhất dành cho bạn</p>
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
                    src={[shopping6, shopping7, shopping8, shopping9][index % 4]} 
                    className="card-img-top p-3" 
                    alt={product.name}
                    style={{
                      height: '250px',
                      objectFit: 'contain',
                      backgroundColor: '#f8f9fa'
                    }}
                  />
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-danger">Giảm {Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}%</span>
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
                    <h4 className="fw-bold mb-0 text-danger">
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
                    WebkitBoxOrient: 'vertical',
                    minHeight: '48px'
                  }}>
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      {product.quantity > 0 ? (
                        <button 
                          className="btn btn-dark"
                          onClick={() => handleAddToCart(product)}
                        >
                          <i className="bi bi-cart-plus me-2"></i>
                          Mua ngay
                        </button>
                      ) : (
                        <button 
                          className="btn btn-secondary"
                          disabled
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          Hết hàng
                        </button>
                      )}
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

export default Deals; 