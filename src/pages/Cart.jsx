import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
  useEffect(() => {
    console.log('Cart data:', cart);
  }, [cart]);

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '0 ₫';
    }
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getItemPrice = (item) => {
    console.log('Getting price for item:', item);
    if (!item?.product) {
      console.warn('Invalid item structure:', item);
      return 0;
    }

    const product = item.product;
    console.log('Product data:', product);
    
    // First try to get salePrice, if not available use originalPrice, then price
    let price = 0;
    if (typeof product.salePrice === 'number') {
      price = product.salePrice;
    } else if (typeof product.originalPrice === 'number') {
      price = product.originalPrice;
    } else if (typeof product.price === 'number') {
      price = product.price;
    }
    
    console.log('Calculated price:', price);
    return price;
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://placehold.co/400x400/png?text=${encodeURIComponent('No Image')}`;
  };

  const subtotal = cart.reduce((sum, item) => {
    if (!item?.product) return sum;
    const price = getItemPrice(item);
    console.log(`Subtotal calculation - Item: ${item?.product?.name}, Price: ${price}, Quantity: ${item.quantity}`);
    return sum + (price * (item.quantity || 1));
  }, 0);
  
  const shipping = cart.length > 0 ? 50000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-page bg-light">
      <div className="container py-5">
        <h1 className="mb-4">Giỏ Hàng</h1>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
            <h3>Giỏ hàng trống</h3>
            <p className="text-muted">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
            <Link to="/products" className="btn btn-primary">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  {cart.map((item) => {
                    if (!item?.product) return null;
                    console.log('Rendering cart item:', item);
                    const product = item.product;
                    const price = getItemPrice(item);
                    
                    return (
                      <div key={item._id} className="row align-items-center mb-3 g-2">
                        <div className="col-2">
                          <img 
                            src={product.image || `https://placehold.co/400x400/png?text=${encodeURIComponent('No Image')}`}
                            alt={product.name || 'Product Image'}
                            className="img-fluid rounded"
                            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                            onError={handleImageError}
                          />
                        </div>
                        <div className="col-3">
                          <h6 className="mb-0 text-truncate" style={{ maxWidth: '200px' }}>{product.name || 'Unknown Product'}</h6>
                          <small className="text-muted d-block">Mã SP: {product._id}</small>
                          {product.originalPrice && product.salePrice && product.originalPrice > product.salePrice && (
                            <small className="text-muted text-decoration-line-through">
                              {formatPrice(product.originalPrice)}
                            </small>
                          )}
                        </div>
                        <div className="col-3">
                          <div className="input-group input-group-sm">
                            <button 
                              className="btn btn-outline-secondary btn-sm px-2"
                              onClick={() => onUpdateQuantity(product._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input 
                              type="number" 
                              className="form-control form-control-sm text-center px-1"
                              value={item.quantity}
                              min="1"
                              style={{ width: '40px' }}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 1;
                                onUpdateQuantity(product._id, value);
                              }}
                            />
                            <button 
                              className="btn btn-outline-secondary btn-sm px-2"
                              onClick={() => onUpdateQuantity(product._id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="col-3 text-end">
                          <h6 className="mb-0 text-danger">
                            {formatPrice(price * item.quantity)}
                          </h6>
                        </div>
                        <div className="col-1 text-center">
                          <button 
                            className="btn btn-link text-danger p-0 btn-sm"
                            onClick={() => onRemoveFromCart(product._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Link to="/products" className="btn btn-outline-dark">
                <i className="bi bi-arrow-left me-2"></i>
                Tiếp tục mua sắm
              </Link>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title mb-4">Tổng đơn hàng</h5>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-4">
                    <strong>Tổng cộng</strong>
                    <h4 className="text-danger mb-0">{formatPrice(total)}</h4>
                  </div>

                  <Link 
                    to="/checkout" 
                    className="btn btn-danger w-100"
                  >
                    Tiến hành thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
        .cart-page {
          min-height: 100vh;
        }
        
        .input-group {
          width: 100px;
        }

        .input-group input {
          text-align: center;
        }

        .input-group input::-webkit-outer-spin-button,
        .input-group input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .input-group input[type=number] {
          -moz-appearance: textfield;
        }

        .btn-link {
          text-decoration: none;
        }

        .btn-link:hover {
          color: #dc3545 !important;
          opacity: 0.8;
        }

        .btn-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }

        .form-control-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }
        `}
      </style>
    </div>
  );
};

export default Cart; 