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
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminOrders from './pages/AdminOrders';
import SearchResults from './pages/SearchResults';
import './App.css';
import axios from './config/axios';

function AppContent() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from server when user logs in
  useEffect(() => {
    const fetchUserCart = async () => {
      if (!user) {
        setCart([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Fetch cart with populated product details
        const response = await axios.get('/api/cart');
        console.log('Cart response:', response.data);
        
        if (response.data && Array.isArray(response.data)) {
          // Transform data to ensure we have product details
          const cartItems = await Promise.all(response.data.map(async (item) => {
            if (!item.product || typeof item.product === 'string') {
              // If product is just an ID or missing, fetch product details
              try {
                const productResponse = await axios.get(`/api/products/${item.product || item.productId}`);
                return {
                  ...item,
                  product: productResponse.data
                };
              } catch (error) {
                console.error('Error fetching product details:', error);
                return item;
              }
            }
            return item;
          }));
          
          setCart(cartItems);
        } else {
          console.error('Invalid cart data structure:', response.data);
          setCart([]);
        }
      } catch (error) {
        console.error('Error fetching user cart:', error);
        if (error.response?.status === 401) {
          return;
        }
        setCart([]);
      } finally {
        setIsLoading(false);
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
      return navigate('/login', { state: { from: location.pathname } });
    }

    try {
      console.log('Adding to cart:', product);
      if (!product?._id) {
        console.error('Invalid product data:', product);
        return;
      }

      const response = await axios.post('/api/cart/add', {
        productId: product._id,
        quantity: 1  // Always add 1 item regardless of product.quantity
      });
      console.log('Add to cart response:', response.data);
      
      if (response.data && response.data.items) {
        // Transform data to ensure we have product details
        const cartItems = await Promise.all(response.data.items.map(async (item) => {
          if (!item.product || typeof item.product === 'string') {
            try {
              const productResponse = await axios.get(`/api/products/${item.product || item.productId}`);
              return {
                ...item,
                product: productResponse.data
              };
            } catch (error) {
              console.error('Error fetching product details:', error);
              return item;
            }
          }
          return item;
        }));
        
        setCart(cartItems);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.data?.message) {
        console.error('Server error:', error.response.data.message);
      }
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      console.log('Removing from cart:', productId);
      const response = await axios.delete(`/api/cart/remove/${productId}`);
      console.log('Remove from cart response:', response.data);
      
      if (response.data && response.data.items) {
        setCart(response.data.items);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    try {
      console.log('Updating quantity:', { productId, quantity });
      const response = await axios.put(`/api/cart/update/${productId}`, {
        quantity
      });
      console.log('Update quantity response:', response.data);
      
      if (response.data && response.data.items) {
        setCart(response.data.items);
      }
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
    logout(); // Call the logout function from useAuth
    navigate('/login'); // Redirect to login page
  };

  if (loading || isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar 
        user={user}
        onLogout={handleLogout}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
      />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage handleAddToCart={handleAddToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/products" element={<ProductList handleAddToCart={handleAddToCart} />} />
          <Route path="/products/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/new-arrivals" element={<NewArrivals handleAddToCart={handleAddToCart} />} />
          <Route path="/deals" element={<Deals handleAddToCart={handleAddToCart} />} />
          <Route path="/brands" element={<Brands />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart 
                  cart={cart} 
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wishlist" 
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout 
                  cart={cart} 
                  onClearCart={handleClearCart}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-status/:orderId" 
            element={
              <ProtectedRoute>
                <OrderStatus />
              </ProtectedRoute>
            } 
          />
          <Route path="/search" element={<SearchResults handleAddToCart={handleAddToCart} />} />
          {/* Admin Routes */}
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />
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

      {/* Add Admin Orders Button for admin users */}
      {user?.isAdmin && (
        <Link 
          to="/admin/orders" 
          className="floating-admin-btn"
          title="Quản lý đơn hàng"
        >
          <i className="bi bi-kanban"></i>
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
