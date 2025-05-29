import React, { useState } from 'react';
import Slider from 'react-slick';
import './FeaturedProductsBlock.css';
import guitar from '../assets/guitar1.webp';
import piano from '../assets/piano1.webp';
import drum from '../assets/drum1.webp';
import toy from '../assets/toy1.webp';
import { useNavigate } from 'react-router-dom';

const featuredData = {
  bestSeller: [
    { id: 1, name: 'Guitar Demo 1', price: '1.000.000đ', image: guitar, status: 'Có hàng' },
    { id: 2, name: 'Piano Demo', price: '3.000.000đ', image: piano, status: 'Có hàng' },
    { id: 3, name: 'Drum Demo', price: '4.000.000đ', image: drum, status: 'Sắp hết hàng' },
    { id: 4, name: 'Toy Demo', price: '2.000.000đ', image: toy, status: 'Có hàng' },
  ],
  newArrival: [
    { id: 5, name: 'Guitar New', price: '2.500.000đ', image: guitar, status: 'Có hàng' },
    { id: 6, name: 'Piano New', price: '4.000.000đ', image: piano, status: 'Có hàng' },
    { id: 7, name: 'Drum New', price: '5.000.000đ', image: drum, status: 'Sắp về' },
    { id: 8, name: 'Toy New', price: '1.500.000đ', image: toy, status: 'Có hàng' },
  ],
  featured: [
    { id: 9, name: 'Guitar Hot', price: '3.000.000đ', image: guitar, status: 'Có hàng' },
    { id: 10, name: 'Piano Hot', price: '5.000.000đ', image: piano, status: 'Có hàng' },
    { id: 11, name: 'Drum Hot', price: '6.000.000đ', image: drum, status: 'Sắp hết hàng' },
    { id: 12, name: 'Toy Hot', price: '2.200.000đ', image: toy, status: 'Có hàng' },
  ],
};

function FeaturedProductsBlock() {
  const [tab, setTab] = useState('bestSeller');
  const navigate = useNavigate();
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };
  const products = featuredData[tab];

  return (
    <section className="featured-products-block py-5">
      <div className="container">
        <div className="d-flex align-items-center mb-4 gap-4">
          <h2 className="featured-title mb-0">Sản Phẩm Nổi Bật</h2>
          <div className="featured-tabs d-flex gap-3">
            <button className={`featured-tab ${tab === 'bestSeller' ? 'active' : ''}`} onClick={() => setTab('bestSeller')}>Bán chạy</button>
            <button className={`featured-tab ${tab === 'newArrival' ? 'active' : ''}`} onClick={() => setTab('newArrival')}>Mới về</button>
            <button className={`featured-tab ${tab === 'featured' ? 'active' : ''}`} onClick={() => setTab('featured')}>Nổi bật</button>
          </div>
        </div>
        <Slider {...sliderSettings} className="featured-slider">
          {products.map(product => (
            <div key={product.id} className="featured-slide">
              <div className="featured-card">
                <img src={product.image} alt={product.name} className="featured-img" />
                <div className="featured-info">
                  <div className="featured-name">{product.name}</div>
                  <div className="featured-price">{product.price}</div>
                  <div className="featured-status">{product.status}</div>
                  <button className="btn btn-primary btn-sm mt-2" onClick={() => navigate(`/products/${product.id}`)}>
                    Xem Chi Tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default FeaturedProductsBlock; 