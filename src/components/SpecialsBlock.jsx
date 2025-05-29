import React, { useState } from 'react';
import Slider from 'react-slick';
import './SpecialsBlock.css';
import fender1 from '../assets/fender1_11zon.jpg';
import fender2 from '../assets/fender2.png';
import fender3 from '../assets/fender3_11zon.jpg';
import fender4 from '../assets/fender4_11zon.jpg';
import fender5 from '../assets/fender5_11zon.jpg';
import yamaha1 from '../assets/yamaha1_11zon.jpg';
import yamaha2 from '../assets/yamaha2_11zon.jpg';
import yamaha3 from '../assets/yamaha3_11zon.jpg';
import yamaha4 from '../assets/yamaha4_11zon.jpg';
import yamaha5 from '../assets/yamaha5_11zon.jpg';
import guitar1 from '../assets/guitar1.webp';
import guitar2 from '../assets/guitar2.webp';
import guitar3 from '../assets/guitar3.webp';
import toy4 from '../assets/toy4.webp';
import { useNavigate } from 'react-router-dom';

const specialsData = {
  hotDeals: [
    {
      id: 1,
      name: 'Martin 41MFX740 Flexible Core',
      price: '115.500đ',
      oldPrice: '165.000đ',
      image: guitar1,
      label: 'Hot Deals',
      status: 'Vừa hết',
    },
    {
      id: 2,
      name: 'Fender FSR Player Stratocaster Fat 50s',
      price: '21.824.000đ',
      oldPrice: '27.280.000đ',
      image: fender1,
      label: 'Hot Deals',
      status: 'Có hàng',
    },
    {
      id: 3,
      name: 'Fender FSR American Ultra HSS',
      price: '61.776.000đ',
      oldPrice: '72.220.000đ',
      image: fender2,
      label: 'Hot Deals',
      status: 'Có hàng',
    },
    {
      id: 4,
      name: 'Fender Limited Edition Player Telecaster',
      price: '24.728.000đ',
      oldPrice: '',
      image: fender3,
      label: 'Hot Deals',
      status: 'Có hàng',
    },
  ],
  bStock: [
    {
      id: 5,
      name: 'Ibanez Gio GRG131DX-BKF',
      price: '5.720.000đ',
      oldPrice: '',
      image: guitar2,
      label: '',
      status: 'Sắp hết hàng',
    },
    {
      id: 6,
      name: 'PRS SE Custom 24',
      price: '21.900.000đ',
      oldPrice: '',
      image: guitar3,
      label: '',
      status: 'Có hàng',
    },
    {
      id: 7,
      name: 'Yamaha P-45',
      price: '8.990.000đ',
      oldPrice: '',
      image: yamaha1,
      label: '',
      status: 'Có hàng',
    },
    {
      id: 8,
      name: 'Yamaha PSR-E373',
      price: '6.500.000đ',
      oldPrice: '',
      image: yamaha2,
      label: '',
      status: 'Có hàng',
    },
    {
      id: 9,
      name: 'Yamaha DGX-660',
      price: '18.000.000đ',
      oldPrice: '',
      image: yamaha3,
      label: '',
      status: 'Có hàng',
    },
  ],
};

function SpecialsBlock() {
  const [tab, setTab] = useState('hotDeals');
  const navigate = useNavigate();
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };
  const products = specialsData[tab];

  return (
    <section className="specials-block py-5">
      <div className="container">
        <div className="d-flex align-items-center mb-4 gap-4">
          <h2 className="specials-title mb-0">SPECIALS</h2>
          <div className="specials-tabs d-flex gap-3">
            <button className={`specials-tab ${tab === 'hotDeals' ? 'active' : ''}`} onClick={() => setTab('hotDeals')}>Hot Deals</button>
            <button className={`specials-tab ${tab === 'bStock' ? 'active' : ''}`} onClick={() => setTab('bStock')}>B-Stock</button>
          </div>
        </div>
        <Slider {...sliderSettings} className="specials-slider">
          {products.map(product => (
            <div key={product.id} className="specials-slide">
              <div className="specials-card">
                {product.label && <span className="specials-label">{product.label}</span>}
                <img src={product.image} alt={product.name} className="specials-img" />
                <div className="specials-info">
                  <div className="specials-name">{product.name}</div>
                  <div className="specials-price">
                    <span className="price-new">{product.price}</span>
                    {product.oldPrice && <span className="price-old ms-2">{product.oldPrice}</span>}
                  </div>
                  <div className="specials-status">{product.status}</div>
                  <button className="btn btn-primary btn-sm mt-2" onClick={() => navigate(`/products/${product.id}`)}>Xem Chi Tiết</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default SpecialsBlock; 