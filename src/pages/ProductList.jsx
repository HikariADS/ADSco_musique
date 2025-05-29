import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

// Configure axios
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

// Add request interceptor to include token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ProductList = ({ handleAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000000000]);
  const [sortBy, setSortBy] = useState('name');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories and brands
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const brands = ['all', ...new Set(products.map(p => p.brand))];

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesBrand && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, selectedBrand, sortBy, itemsPerPage]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

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
    <div className="products-page">
      <div className="products-hero">
        <div className="container">
          <h1 className="text-center mb-4">Sản Phẩm</h1>
          <p className="text-center text-white mb-0">Khám phá bộ sưu tập nhạc cụ đa dạng và chất lượng</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Filters */}
        <div className="filter-section p-4 mb-4 rounded shadow-sm">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label fw-bold">Danh mục</label>
              <select 
                className="form-select border-0 shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Tất cả danh mục' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label fw-bold">Thương hiệu</label>
              <select 
                className="form-select border-0 shadow-sm"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand === 'all' ? 'Tất cả thương hiệu' : brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label fw-bold">Sắp xếp theo</label>
              <select 
                className="form-select border-0 shadow-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Tên A-Z</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label fw-bold">Hiển thị</label>
              <select 
                className="form-select border-0 shadow-sm"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={12}>12 sản phẩm</option>
                <option value={16}>16 sản phẩm</option>
                <option value={24}>24 sản phẩm</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="mb-0 text-muted">
            Hiển thị {Math.min(startIndex + 1, filteredProducts.length)}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} 
            trong số {filteredProducts.length} sản phẩm
          </p>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {paginatedProducts.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="card h-100 product-card shadow-sm border-0">
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
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-dark">{product.brand}</span>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title mb-1">{product.name}</h5>
                  </div>
                  <p className="text-muted small mb-2">{product.category}</p>
                  <div className="mb-2">
                    {[...Array(5)].map((_, index) => (
                      <i 
                        key={index}
                        className={`bi bi-star${index < Math.floor(product.rating) ? '-fill' : index < product.rating ? '-half' : ''} text-warning`}
                      ></i>
                    ))}
                    <small className="text-muted ms-2">({product.rating})</small>
                  </div>
                  <p className="card-text text-muted small" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '3em'
                  }}>
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-danger mb-0">{formatPrice(product.price)}</h4>
                      <span className={`badge ${product.inStock ? 'bg-success' : 'bg-danger'}`}>
                        {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                      </span>
                    </div>
                    <div className="d-grid gap-2">
                      <Link to={`/products/${product._id}`} className="btn btn-outline-dark">
                        <i className="bi bi-eye me-2"></i>
                        Chi tiết
                      </Link>
                      <button 
                        className="btn btn-danger" 
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Trước
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li 
                    key={index + 1} 
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Sau
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <h3 className="text-muted">Không tìm thấy sản phẩm phù hợp</h3>
          </div>
        )}

        <style jsx>{`
          .products-page {
            background-color: #f8f9fa;
          }

          .products-hero {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                        url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
            background-size: cover;
            background-position: center;
            padding: 80px 0;
            margin-bottom: 40px;
          }

          .products-hero h1 {
            color: white;
            font-size: 3rem;
            font-weight: bold;
          }

          .filter-section {
            background: white;
          }

          .product-card {
            transition: all 0.3s ease;
            background: white;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
          }

          .form-select:focus {
            box-shadow: none;
            border-color: #dc3545;
          }

          .page-link {
            color: #dc3545;
            border-color: #dee2e6;
          }

          .page-link:focus {
            box-shadow: none;
          }

          .page-item.active .page-link {
            background-color: #dc3545;
            border-color: #dc3545;
          }

          .btn-outline-dark:hover {
            background-color: #dc3545;
            border-color: #dc3545;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProductList; 