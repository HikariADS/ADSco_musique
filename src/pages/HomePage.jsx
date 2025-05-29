import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import guitar1 from '../assets/guitar1.webp';
import guitar2 from '../assets/guitar2.webp';
import piano2 from '../assets/piano2.webp';
import drum2 from '../assets/drum2.webp';
import toy2 from '../assets/toy2.webp';
import deal from '../assets/deal.webp';
import placeholder from '../assets/toy1.webp';
import guitar4 from '../assets/guitar4.webp';
import piano1 from '../assets/piano1.webp';
import piano3 from '../assets/piano3.webp';
import piano4 from '../assets/piano4.webp';
import piano5 from '../assets/piano5.webp';
import drum1 from '../assets/drum1.webp';
import toy1 from '../assets/toy1.webp';
import './HomePage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BlogBlock from '../components/BlogBlock';
import SpecialsBlock from '../components/SpecialsBlock';
import FeaturedProducts from './FeaturedProducts';

function HomePage({ handleAddToCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const heroBanners = [
    {
      image: deal,
      alt: 'Fender Standard Series',
      link: '/products',
    },
    {
      image: guitar1,
      alt: 'Guitar Demo',
      link: '/products',
    },
    {
      image: placeholder,
      alt: 'Placeholder',
      link: '/products',
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const pianoImages = [piano1, piano2, piano3, piano4, piano5];
  const randomPianoImage = useMemo(() => {
    return pianoImages[Math.floor(Math.random() * pianoImages.length)];
  }, []);

  const categories = [
    {
      id: 1,
      name: 'Guitar & Bass',
      image: guitar4,
      count: 150,
      slug: 'guitar'
    },
    {
      id: 2,
      name: 'Keyboard & Piano',
      image: randomPianoImage,
      count: 80,
      slug: 'piano'
    },
    {
      id: 3,
      name: 'Drums',
      image: drum1,
      count: 60,
      slug: 'drum'
    },
    {
      id: 4,
      name: 'Toys',
      image: toy1,
      count: 40,
      slug: 'toys'
    }
  ];

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <div>
      {/* 1. Hero Section - Slider */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-4 mb-4">Khám Phá Thế Giới Âm Nhạc</h1>
              <p className="lead mb-4">Tìm kiếm nhạc cụ và thiết bị âm thanh chất lượng cao từ các thương hiệu hàng đầu thế giới.</p>
              <Link to="/products" className="btn btn-primary btn-lg">Mua Sắm Ngay</Link>
            </div>
            <div className="col-md-6">
              <Slider {...sliderSettings} className="hero-slider">
                {heroBanners.map((banner) => (
                  <div key={banner.alt} className="hero-slider-item">
                    <Link to={banner.link}>
                      <img src={banner.image} alt={banner.alt} className="hero-slider-img" />
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="categories-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Danh Mục Nổi Bật</h2>
          <div className="row gx-4 gy-4">
            {categories.map(category => (
              <div key={category.id} className="col-12 col-sm-6 col-md-3 d-flex">
                <div
                  className="category-card w-100"
                  onClick={() => handleCategoryClick(category.slug)}
                  style={{ cursor: 'pointer', position: 'relative', zIndex: 10 }}
                >
                  <div className="category-image">
                    <img src={category.image} alt={category.name} className="img-fluid" />
                  </div>
                  <div className="category-info">
                    <h3>{category.name}</h3>
                    <p>{category.count} sản phẩm</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <FeaturedProducts handleAddToCart={handleAddToCart} />

      {/* 4. Specials/Hot Deals */}
      <SpecialsBlock />

      {/* 5. Blog & Tin Tức */}
      <BlogBlock />

      {/* 6. Newsletter Section */}
      <section className="newsletter-section py-5">
        <div className="container text-center">
          <h2 className="mb-4">Đăng Ký Nhận Tin</h2>
          <p className="lead mb-4">Nhận thông tin về sản phẩm mới và khuyến mãi đặc biệt</p>
          <form className="newsletter-form" style={{ position: 'relative', zIndex: 10 }}>
            <div className="input-group mx-auto" style={{ maxWidth: '500px' }}>
              <input type="email" className="form-control" placeholder="Email của bạn" />
              <button className="btn btn-primary" type="submit">Đăng Ký</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default HomePage; 