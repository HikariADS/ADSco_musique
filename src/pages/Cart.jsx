import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 50000 : 0; // Phí vận chuyển cố định
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
                  {cart.map((item) => (
                    <div key={item.productId._id} className="row align-items-center mb-4">
                      <div className="col-md-2">
                        <img 
                          src={item.productId.image} 
                          alt={item.productId.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: '100px', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="col-md-4">
                        <h5 className="mb-1">{item.productId.name}</h5>
                        <p className="text-muted mb-0">Mã SP: {item.productId._id}</p>
                      </div>
                      <div className="col-md-2">
                        <div className="input-group">
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => onUpdateQuantity(item.productId._id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            className="form-control text-center"
                            value={item.quantity}
                            onChange={(e) => onUpdateQuantity(item.productId._id, parseInt(e.target.value) || 1)}
                          />
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => onUpdateQuantity(item.productId._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <h5 className="text-end mb-0 text-danger">
                          {formatPrice(item.productId.price * item.quantity)}
                        </h5>
                      </div>
                      <div className="col-md-1">
                        <button 
                          className="btn btn-link text-danger"
                          onClick={() => onRemoveFromCart(item.productId._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
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
          width: 120px;
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
        `}
      </style>
    </div>
  );
};

export default Cart; 