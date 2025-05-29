import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import NewArrivals from './pages/NewArrivals';
import Deals from './pages/Deals';
import Brands from './pages/Brands';
import Footer from './components/Footer';
import OrderStatus from './pages/OrderStatus';
import './App.css';
import axios from 'axios';

function AppContent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [pendingOrders, setPendingOrders] = useState(0);

  // Load cart from server when user logs in
  useEffect(() => {
    const fetchUserCart = async () => {
      if (user) {
        try {
          const response = await axios.get('/api/cart');
          setCart(response.data.items || []);
        } catch (error) {
          console.error('Error fetching user cart:', error);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };

    fetchUserCart();
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPendingOrders();
    } else {
      setPendingOrders(0);
    }
  }, [user]);

  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get('/api/orders/user/orders');
      const pending = response.data.filter(order => 
        order.status === 'pending' || order.status === 'processing' || order.status === 'shipping'
      ).length;
      setPendingOrders(pending);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      return navigate('/login', { state: { from: location.pathname } });
    }

    try {
      const response = await axios.post('/api/cart/add', {
        productId: product._id,
        quantity: 1
      });
      setCart(response.data.items || []); // Đảm bảo luôn set một mảng
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${productId}`);
      setCart(response.data.items || []); // Đảm bảo luôn set một mảng
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    try {
      const response = await axios.put(`/api/cart/update/${productId}`, {
        quantity
      });
      setCart(response.data.items || []); // Đảm bảo luôn set một mảng
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete('/api/cart/clear');
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleLogout = () => {
    setCart([]); // Clear cart in state
    setPendingOrders(0); // Reset pending orders
    logout(); // Call the original logout function
  };

  return (
      <div className="App">
      <Navbar 
        user={user}
        onLogout={handleLogout}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
      />
        <div className="main-content">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/products" element={<ProductList handleAddToCart={handleAddToCart} />} />
            <Route path="/products/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/deals" element={<Deals handleAddToCart={handleAddToCart} />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/cart" element={
            user ? (
              <Cart 
                cart={cart} 
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ) : (
              <Navigate to="/login" state={{ from: '/cart' }} />
            )
            } />
          <Route path="/wishlist" element={user ? <Wishlist /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={
            user ? (
              <Checkout 
                cart={cart} 
                onClearCart={handleClearCart}
              />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/orders" element={user ? <OrderHistory /> : <Navigate to="/login" />} />
          <Route path="/order-status/:orderId" element={<OrderStatus />} />
          </Routes>
        </div>
        <Footer />

      {user && (
        <Link 
          to="/orders" 
          className="floating-orders-btn"
          title="Đơn hàng của tôi"
        >
          <i className="bi bi-box-seam"></i>
          {pendingOrders > 0 && (
            <span className="orders-badge">{pendingOrders}</span>
          )}
        </Link>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
