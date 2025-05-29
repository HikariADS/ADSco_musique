import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

// Import guitar images
import guitar1 from '../assets/guitar1.webp';
import guitar2 from '../assets/guitar2.webp';
import guitar3 from '../assets/guitar3.webp';
import guitar4 from '../assets/guitar4.webp';
import guitar5 from '../assets/guitar5.webp';

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
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000000000]);
  const [sortBy, setSortBy] = useState('name');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Categorized images
  const imagesByCategory = {
    guitar: [guitar1, guitar2, guitar3, guitar4, guitar5],
    microphone: [shopping1, shopping2, shopping3, shopping4, shopping5],
    headphones: [shopping6, shopping7, shopping8, shopping9, shopping10],
    interface: [shopping11, shopping12, shopping13, shopping14, shopping15],
    other: [
      shopping16, shopping17, shopping18, shopping19, shopping20,
      shopping21, shopping22, shopping23, shopping24, shopping25, shopping26
    ]
  };

  const getImageForProduct = (product, index) => {
    const category = product.category.toLowerCase();
    let images;

    if (category.includes('guitar')) {
      images = imagesByCategory.guitar;
    } else if (category.includes('microphone')) {
      images = imagesByCategory.microphone;
    } else if (category.includes('headphone')) {
      images = imagesByCategory.headphones;
    } else if (category.includes('interface')) {
      images = imagesByCategory.interface;
    } else {
      images = imagesByCategory.other;
    }

    return images[index % images.length];
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      const productsWithImages = response.data.map((product, index) => ({
        ...product,
        image: getImageForProduct(product, index)
      }));
      setProducts(productsWithImages);
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
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesPrice = product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1];
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.salePrice - b.salePrice;
      case 'price-desc':
        return b.salePrice - a.salePrice;
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

  // Add search handler
  const handleSearch = (e) => {
    e.preventDefault();
    // Có thể thêm logic tìm kiếm khác ở đây nếu cần
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
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
          <h1 className="display-4 fw-bold mb-3 text-center">Sản Phẩm</h1>
          <p className="text-muted fs-5 text-center">Khám phá bộ sưu tập nhạc cụ đa dạng và chất lượng</p>
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
                  {product.isOnSale && product.discount > 0 && (
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-danger">-{product.discount}%</span>
                    </div>
                  )}
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
                      {formatPrice(product.isOnSale ? product.salePrice : product.originalPrice)}
                    </h4>
                    {product.isOnSale && product.discount > 0 && (
                      <small className="text-muted text-decoration-line-through">
                        {formatPrice(product.originalPrice)}
                      </small>
                    )}
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
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => setCurrentPage(currentPage - 1)}
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
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default ProductList; 