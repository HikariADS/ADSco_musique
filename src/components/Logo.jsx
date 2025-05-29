import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/logo.css';
import logo from '../assets/logo.png';

const Logo = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'hb-logo-sm',
    default: 'hb-logo',
    large: 'hb-logo-lg'
  };

  return (
    <Link to="/" className={`text-decoration-none ${className}`}>
      <div className={`logo-container ${sizeClasses[size]}`}>
        <img 
          src={logo}
          alt="Hoang's Brother" 
          className="logo-image"
        />
      </div>
    </Link>
  );
};

export default Logo; 