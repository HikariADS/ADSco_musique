import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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

const SearchResults = ({ handleAddToCart }) => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Array of shopping images
  const shoppingImages = [
    shopping1, shopping2, shopping3, shopping4, shopping5,
    shopping6, shopping7, shopping8, shopping9, shopping10
  ];

  useEffect(() => {
    fetchSearchResults();
  }, [keyword]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      const allProducts = response.data;
      
      // Lọc sản phẩm theo từ khóa
      const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.description.toLowerCase().includes(keyword.toLowerCase()) ||
        product.brand.toLowerCase().includes(keyword.toLowerCase()) ||
        product.category.toLowerCase().includes(keyword.toLowerCase())
      );

      // Thêm ảnh cho mỗi sản phẩm
      const productsWithImages = filteredProducts.map((product, index) => ({
        ...product,
        image: shoppingImages[index % shoppingImages.length]
      }));

      setProducts(productsWithImages);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Không thể tải kết quả tìm kiếm');
      setLoading(false);
    }
  };

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
    <div className="search-results py-5">
      <div className="container">
        <h1 className="text-center mb-4">Kết Quả Tìm Kiếm</h1>
        <p className="text-center text-muted mb-5">{products.length} kết quả cho "{keyword}"</p>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 product-card border-0 shadow-sm">
                <div className="position-relative">
                  <img 
                    src={product.image} 
                    className="card-img-top p-3" 
                    alt={product.name}
                    style={{
                      height: '200px',
                      objectFit: 'contain',
                      backgroundColor: '#f8f9fa'
                    }}
                  />
                  {product.discount > 0 && (
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-danger">-{product.discount}%</span>
                    </div>
                  )}
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-dark">{product.brand}</span>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-3">{product.name}</h5>
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
                    <h4 className="text-danger mb-0">
                      {formatPrice(product.salePrice)}
                    </h4>
                    {product.discount > 0 && (
                      <small className="text-muted text-decoration-line-through">
                        {formatPrice(product.originalPrice)}
                      </small>
                    )}
                  </div>
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Thêm vào giỏ
                      </button>
                      <Link 
                        to={`/products/${product._id}`}
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

        {products.length === 0 && (
          <div className="text-center py-5">
            <h3 className="text-muted">Không tìm thấy sản phẩm nào</h3>
            <Link to="/products" className="btn btn-primary mt-3">
              Xem tất cả sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 