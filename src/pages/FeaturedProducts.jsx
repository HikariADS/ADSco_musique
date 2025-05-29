import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import shopping images
import shopping1 from '../assets/shopping (1).webp';
import shopping2 from '../assets/shopping (2).webp';
import shopping3 from '../assets/shopping (3).webp';
import shopping4 from '../assets/shopping (4).webp';
import shopping5 from '../assets/shopping (5).webp';
import shopping6 from '../assets/shopping (6).webp';
import shopping7 from '../assets/shopping (7).webp';
import shopping8 from '../assets/shopping (8).webp';
import shopping9 from '../assets/shopping (9).webp';
import shopping10 from '../assets/shopping (10).webp';
import shopping11 from '../assets/shopping (11).webp';
import shopping12 from '../assets/shopping (12).webp';
import shopping13 from '../assets/shopping (13).webp';
import shopping14 from '../assets/shopping (14).webp';
import shopping15 from '../assets/shopping (15).webp';
import shopping16 from '../assets/shopping (16).webp';
import shopping17 from '../assets/shopping (17).webp';
import shopping18 from '../assets/shopping (18).webp';
import shopping19 from '../assets/shopping (19).webp';
import shopping20 from '../assets/shopping (20).webp';
import shopping21 from '../assets/shopping (21).webp';
import shopping22 from '../assets/shopping (22).webp';
import shopping23 from '../assets/shopping (23).webp';
import shopping24 from '../assets/shopping (24).webp';
import shopping25 from '../assets/shopping (25).webp';
import shopping26 from '../assets/shopping (26).webp';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const FeaturedProducts = ({ handleAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Array of shopping images
  const shoppingImages = [
    shopping1, shopping2, shopping3, shopping4, shopping5, shopping6, shopping7, shopping8,
    shopping9, shopping10, shopping11, shopping12, shopping13, shopping14, shopping15, shopping16,
    shopping17, shopping18, shopping19, shopping20, shopping21, shopping22, shopping23, shopping24,
    shopping25, shopping26
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const featuredProducts = response.data
          .filter(product => product.rating >= 4.7)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);
        // Assign shopping images to products
        const productsWithImages = featuredProducts.map((product, index) => ({
          ...product,
          image: shoppingImages[index % shoppingImages.length]
        }));
        setProducts(productsWithImages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải danh sách sản phẩm nổi bật');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleShowDetails = (product) => {
    setSelectedProduct({...product, quantity: 1});
  };

  const handleQuickAddToCart = async (product) => {
    try {
      await handleAddToCart({ ...product, quantity: product.quantity || 1 });
      const modal = document.getElementById('productModal');
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const brands = ['all', ...new Set(products.map(product => product.brand))];

  const filteredProducts = selectedBrand === 'all' 
    ? products 
    : products.filter(product => product.brand === selectedBrand);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="featured-products-page py-5" style={{ backgroundColor: '#fdf6e9' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Sản Phẩm Nổi Bật</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="lead text-muted">
                Những sản phẩm được đánh giá cao nhất từ khách hàng
              </p>
            </div>
          </div>
        </div>

        <div className="brand-filter text-center mb-4">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {brands.map(brand => (
              <button
                key={brand}
                className={`btn ${selectedBrand === brand ? 'btn-dark' : 'btn-outline-dark'} rounded-pill`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand === 'all' ? 'Tất cả' : brand}
              </button>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 product-card border-0 bg-white">
                <div className="position-relative overflow-hidden">
                  <img 
                    src={product.image} 
                    className="card-img-top p-4" 
                    alt={product.name}
                    style={{
                      height: '240px',
                      objectFit: 'contain',
                      backgroundColor: '#fff'
                    }}
                  />
                  {product.discount > 0 && (
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-danger rounded-pill px-3">-{product.discount}%</span>
                    </div>
                  )}
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-dark rounded-pill px-3">{product.brand}</span>
                  </div>
                </div>
                
                <div className="card-body text-center">
                  <p className="text-muted small mb-2">{product.category}</p>
                  <h5 className="card-title text-dark mb-2">{product.name}</h5>
                  <div className="ratings mb-2">
                    {[...Array(5)].map((_, index) => (
                      <i 
                        key={index}
                        className={`bi bi-star${index < Math.floor(product.rating) ? '-fill' : index < product.rating ? '-half' : ''} text-warning`}
                      ></i>
                    ))}
                    <span className="ms-2 text-muted">({product.rating})</span>
                  </div>
                  <div className="pricing mb-3">
                    <h5 className="text-danger mb-0 fw-bold">
                      {formatPrice(product.salePrice)}
                    </h5>
                    {product.discount > 0 && (
                      <small className="text-muted text-decoration-line-through">
                        {formatPrice(product.originalPrice)}
                      </small>
                    )}
                  </div>
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-dark rounded-pill"
                      onClick={() => handleShowDetails(product)}
                      data-bs-toggle="modal"
                      data-bs-target="#productModal"
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Mua ngay
                    </button>
                    <Link 
                      to={`/product/${product._id}`}
                      className="btn btn-outline-dark rounded-pill"
                    >
                      <i className="bi bi-eye me-2"></i>
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Buy Modal */}
      <div className="modal fade" id="productModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 border-0">
            {selectedProduct && (
              <>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">{selectedProduct.name}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row">
                    <div className="col-md-6">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: '300px', width: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <span className="badge bg-dark me-2">{selectedProduct.brand}</span>
                        <span className="badge bg-secondary">{selectedProduct.category}</span>
                      </div>
                      <div className="ratings mb-3">
                        {[...Array(5)].map((_, index) => (
                          <i 
                            key={index}
                            className={`bi bi-star${index < Math.floor(selectedProduct.rating) ? '-fill' : index < selectedProduct.rating ? '-half' : ''} text-warning`}
                          ></i>
                        ))}
                        <span className="ms-2">({selectedProduct.rating})</span>
                      </div>
                      <div className="pricing mb-3">
                        <h3 className="text-danger fw-bold mb-0">
                          {formatPrice(selectedProduct.salePrice)}
                        </h3>
                        {selectedProduct.discount > 0 && (
                          <div>
                            <span className="text-muted text-decoration-line-through me-2">
                              {formatPrice(selectedProduct.originalPrice)}
                            </span>
                            <span className="badge bg-danger">-{selectedProduct.discount}%</span>
                          </div>
                        )}
                      </div>
                      <div className="quantity-selector mb-3">
                        <label className="form-label">Số lượng:</label>
                        <div className="d-flex align-items-center">
                          <button 
                            className="btn btn-outline-secondary px-3"
                            type="button"
                            onClick={() => {
                              const newQuantity = Math.max(1, selectedProduct.quantity - 1);
                              setSelectedProduct({...selectedProduct, quantity: newQuantity});
                            }}
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            className="form-control mx-2 text-center"
                            style={{ width: '60px', flex: '0 0 auto' }}
                            value={selectedProduct.quantity || 1}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              const newQuantity = Math.max(1, Math.min(10, value));
                              setSelectedProduct({...selectedProduct, quantity: newQuantity});
                            }}
                            min="1"
                            max="10"
                          />
                          <button 
                            className="btn btn-outline-secondary px-3"
                            type="button"
                            onClick={() => {
                              const newQuantity = Math.min(10, (selectedProduct.quantity || 1) + 1);
                              setSelectedProduct({...selectedProduct, quantity: newQuantity});
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="product-features mb-3">
                        <h6 className="fw-bold mb-2">Đặc điểm nổi bật:</h6>
                        <ul className="list-unstyled">
                          <li><i className="bi bi-check2-circle text-success me-2"></i>Thương hiệu: {selectedProduct.brand}</li>
                          <li><i className="bi bi-check2-circle text-success me-2"></i>Danh mục: {selectedProduct.category}</li>
                          <li><i className="bi bi-check2-circle text-success me-2"></i>Tình trạng: Còn hàng</li>
                          <li><i className="bi bi-check2-circle text-success me-2"></i>Bảo hành: 12 tháng</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button 
                    type="button" 
                    className="btn btn-secondary rounded-pill px-4"
                    data-bs-dismiss="modal"
                  >
                    <i className="bi bi-x-lg me-2"></i>
                    Đóng
                  </button>
                  <button 
                    type="button"
                    className="btn btn-primary rounded-pill px-4"
                    onClick={() => handleQuickAddToCart(selectedProduct)}
                  >
                    <i className="bi bi-cart-plus me-2"></i>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .featured-products-page {
          background-color: #fdf6e9;
        }

        .product-card {
          transition: all 0.3s ease;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .product-card img {
          transition: all 0.3s ease;
        }

        .product-card:hover img {
          transform: scale(1.05);
        }

        .btn {
          border-width: 2px;
          padding: 8px 20px;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .rounded-pill {
          padding-left: 20px;
          padding-right: 20px;
        }

        .modal-content {
          border-radius: 20px;
          border: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .modal-header .btn-close:focus {
          box-shadow: none;
        }

        .product-features li {
          margin-bottom: 8px;
        }

        .quantity-selector input::-webkit-outer-spin-button,
        .quantity-selector input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .quantity-selector input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts; 