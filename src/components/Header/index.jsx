import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import './Header.css';

function Header({ user, onLogout, cartCount }) {
  return (
    <header className="site-header">
      <Topbar />
      <Navbar user={user} onLogout={onLogout} cartCount={cartCount} />
    </header>
  );
}

export default Header; 