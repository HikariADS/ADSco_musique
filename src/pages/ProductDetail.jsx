import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../config/axios';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Không thể tải thông tin sản phẩm');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
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

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Không tìm thấy sản phẩm</h2>
        <Link to="/products" className="btn btn-primary mt-3">
          Quay lại trang sản phẩm
        </Link>
      </div>
    );
  }

  const productImages = [
    product.image,
    // Thêm các ảnh khác của sản phẩm nếu có
  ];

  return (
    <div className="product-detail-page py-5">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products">Sản phẩm</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Product Images */}
          <div className="col-md-6">
            <div className="product-images">
              <div className="main-image mb-3">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'contain',
                    backgroundColor: '#f8f9fa'
                  }}
                />
              </div>
              <div className="thumbnail-images d-flex gap-2">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-image ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="img-fluid rounded"
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'contain',
                        backgroundColor: '#f8f9fa',
                        border: selectedImage === index ? '2px solid #0d6efd' : '2px solid transparent'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <div className="product-info">

              <h1 className="product-title mb-3">{product.name}</h1>
              
              <div className="product-meta mb-4">
                <span className="badge bg-dark me-2">{product.brand}</span>
                <span className="badge bg-secondary">{product.category}</span>
              </div>

              <div className="product-rating mb-3">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`bi bi-star${
                      index < Math.floor(product.rating)
                        ? '-fill'
                        : index < product.rating
                        ? '-half'
                        : ''
                    } text-warning`}
                  ></i>
                ))}
                <span className="ms-2">({product.rating})</span>
              </div>

              <div className="product-price mb-4">
                <h2 className="text-danger mb-0">
                  {formatPrice(product.salePrice)}
                </h2>
                {product.discount > 0 && (
                  <div>
                    <span className="text-muted text-decoration-line-through me-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="badge bg-danger">-{product.discount}%</span>
                  </div>
                )}
              </div>

              <div className="product-description mb-4">
                <h5 className="mb-3">Mô tả sản phẩm</h5>
                <p className="text-muted">{product.description}</p>
              </div>

              <div className="product-features mb-4">
                <h5 className="mb-3">Đặc điểm nổi bật</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check2-circle text-success me-2"></i>
                    Thương hiệu: {product.brand}
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check2-circle text-success me-2"></i>
                    Danh mục: {product.category}
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check2-circle text-success me-2"></i>
                    Tình trạng: Còn hàng
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check2-circle text-success me-2"></i>
                    Bảo hành: 12 tháng
                  </li>
                </ul>
              </div>

              <div className="product-actions">
                <div className="quantity-selector mb-3">
                  <label className="form-label">Số lượng:</label>
                  <div className="input-group" style={{ width: '150px' }}>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      min="1"
                      max="10"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={handleAddToCart}
                  >
                    <i className="bi bi-cart-plus me-2"></i>
                    Thêm vào giỏ hàng
                  </button>
                  <Link to="/cart" className="btn btn-success">
                    <i className="bi bi-credit-card me-2"></i>
                    Mua ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products section can be added here */}
      </div>

      <style jsx>{`
        .product-detail-page {
          background-color: #fff;
          min-height: 100vh;
        }

        .product-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }

        .product-meta .badge {
          padding: 8px 16px;
          font-size: 0.9rem;
        }

        .product-price h2 {
          font-size: 2.5rem;
          font-weight: bold;
        }

        .product-description {
          line-height: 1.8;
        }

        .product-features li {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .quantity-selector input::-webkit-outer-spin-button,
        .quantity-selector input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .quantity-selector input[type=number] {
          -moz-appearance: textfield;
        }

        .btn {
          padding: 12px 24px;
          font-weight: 600;
        }

        .breadcrumb {
          margin-bottom: 2rem;
        }

        .breadcrumb-item + .breadcrumb-item::before {
          content: "›";
        }
      `}</style>
    </div>
  );
};

export default ProductDetail; 