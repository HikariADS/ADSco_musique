import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';

// Import images
import guitar1 from '../assets/guitar1.webp';
import guitar2 from '../assets/guitar2.webp';
import guitar3 from '../assets/guitar3.webp';
import guitar4 from '../assets/guitar4.webp';
import guitar5 from '../assets/guitar5.webp';
import guitar6 from '../assets/guitar6.webp';
import guitar7 from '../assets/guitar7.jpg';
import piano1 from '../assets/piano1.webp';
import piano2 from '../assets/piano2.webp';
import piano3 from '../assets/piano3.webp';
import piano4 from '../assets/piano4.webp';
import piano5 from '../assets/piano5.webp';
import drum1 from '../assets/drum1.webp';
import drum2 from '../assets/drum2.webp';
import drum3 from '../assets/drum3.webp';
import drum4 from '../assets/drum4.webp';
import drum5 from '../assets/drum5.webp';
import yamaha1 from '../assets/yamaha1_11zon.jpg';
import yamaha2 from '../assets/yamaha2_11zon.jpg';
import yamaha3 from '../assets/yamaha3_11zon.jpg';
import yamaha4 from '../assets/yamaha4_11zon.jpg';
import yamaha5 from '../assets/yamaha5_11zon.jpg';
import toy1 from '../assets/toy1.webp';
import toy2 from '../assets/toy2.webp';
import toy3 from '../assets/toy3.webp';
import toy4 from '../assets/toy4.webp';
import toy5 from '../assets/toy5.webp';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const Product = ({ handleAddToCart }) => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  const product = products.find(p => p._id === id) || products[0];

  const handleImageClick = (index) => {
    setActiveImage(index);
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Gallery Section */}
        <div className="col-md-6 mb-4">
          <div className="position-relative mb-4">
            <img
              src={product.gallery[activeImage]}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                width: '100%',
                height: '500px',
                objectFit: 'contain',
                backgroundColor: '#f8f9fa'
              }}
            />
            {product.discount > 0 && (
              <div className="position-absolute top-0 start-0 m-3">
                <span className="badge bg-danger">-{product.discount}%</span>
              </div>
            )}
          </div>
          <div className="d-flex gap-2">
            {product.gallery.map((img, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                style={{
                  cursor: 'pointer',
                  opacity: activeImage === index ? 1 : 0.6
                }}
              >
                <img
                  src={img}
                  alt={`${product.name} - ${index + 1}`}
                  className="img-fluid rounded"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                    backgroundColor: '#f8f9fa'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="col-md-6">
          <div className="mb-3">
            <span className="badge bg-dark me-2">{product.brand}</span>
            <span className="badge bg-secondary">{product.category}</span>
          </div>
          <h1 className="fw-bold mb-3">{product.name}</h1>
          
          <div className="mb-3">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`bi bi-star${index < Math.floor(product.rating) ? '-fill' : index < product.rating ? '-half' : ''} text-warning`}
              ></i>
            ))}
            <span className="ms-2">{product.rating}/5</span>
          </div>

          <div className="mb-4">
            {product.salePrice ? (
              <>
                <h2 className="text-danger fw-bold mb-0">
                  {formatPrice(product.salePrice)}
                </h2>
                <span className="text-muted text-decoration-line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </>
            ) : (
              <h2 className="fw-bold mb-0">{formatPrice(product.originalPrice)}</h2>
            )}
          </div>

          <div className="mb-4">
            <h5 className="fw-bold mb-3">Mô tả sản phẩm</h5>
            <p style={{ whiteSpace: 'pre-line' }}>{product.longDescription}</p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold mb-3">Thông số kỹ thuật</h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className="fw-bold" style={{ width: '30%' }}>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button
              className="btn btn-dark btn-lg"
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
            >
              <i className="bi bi-cart-plus me-2"></i>
              {product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product; 