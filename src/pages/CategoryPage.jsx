import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// Import piano images
import piano1 from '../assets/piano1.webp';
import piano2 from '../assets/piano2.webp';
import piano3 from '../assets/piano3.webp';
import piano4 from '../assets/piano4.webp';
import piano5 from '../assets/piano5.webp';

// Import drum images
import drum1 from '../assets/drum1.webp';
import drum2 from '../assets/drum2.webp';
import drum3 from '../assets/drum3.webp';
import drum4 from '../assets/drum4.webp';
import drum5 from '../assets/drum5.webp';

// Import toy images
import toy1 from '../assets/toy1.webp';
import toy2 from '../assets/toy2.webp';
import toy3 from '../assets/toy3.webp';
import toy4 from '../assets/toy4.webp';
import toy5 from '../assets/toy5.webp';

// Import guitar images
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

const CategoryPage = ({ handleAddToCart }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Categorized images
  const categoryImages = {
    piano: [piano1, piano2, piano3, piano4, piano5],
    drum: [drum1, drum2, drum3, drum4, drum5],
    toys: [toy1, toy2, toy3, toy4, toy5],
    guitar: [shopping1, shopping2, shopping3, shopping4, shopping5]
  };

  // Mapping category slugs to display names
  const categoryNames = {
    'guitar': 'Guitar & Bass',
    'piano': 'Keyboard & Piano',
    'drum': 'Drums & Percussion',
    'toys': 'Musical Toys'
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      const allProducts = response.data;
      
      // Lọc sản phẩm theo danh mục
      const filteredProducts = allProducts.filter(product => {
        const productCategory = product.category.toLowerCase();
        const currentCategory = category.toLowerCase();
        
        switch(currentCategory) {
          case 'guitar':
            return productCategory.includes('guitar') || productCategory.includes('bass');
          case 'piano':
            return productCategory.includes('piano') || productCategory.includes('keyboard');
          case 'drum':
            return productCategory.includes('drum') || productCategory.includes('percussion');
          case 'toys':
            return productCategory.includes('toy') || productCategory.includes('accessories');
          default:
            return false;
        }
      });

      // Thêm ảnh cho mỗi sản phẩm dựa vào danh mục
      const productsWithImages = filteredProducts.map((product, index) => ({
        ...product,
        image: categoryImages[category][index % categoryImages[category].length]
      }));

      setProducts(productsWithImages);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching category products:', err);
      setError('Không thể tải danh sách sản phẩm');
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
    <div className="category-page py-5">
      <div className="container">
        <h1 className="text-center mb-4">{categoryNames[category] || 'Danh Mục Sản Phẩm'}</h1>
        <p className="text-center text-muted mb-5">{products.length} sản phẩm</p>

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
            <h3 className="text-muted">Không có sản phẩm nào trong danh mục này</h3>
            <Link to="/products" className="btn btn-primary mt-3">
              Xem tất cả sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage; 