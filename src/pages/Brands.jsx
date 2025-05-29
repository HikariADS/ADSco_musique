import React from 'react';
import { Link } from 'react-router-dom';

// Import logos
import IbanezLogo from '../assets/Ibanez_logo.png';
import MartinLogo from '../assets/Martin_logo.png';
import RolandLogo from '../assets/Roland_logo.png';
import YamahaLogo from '../assets/Yamaha_logo.png';
import GibsonLogo from '../assets/Gibson_logo.png';
import FenderLogo from '../assets/Fender_logo.png';

const brands = [
  {
    id: 1,
    name: 'Fender',
    logo: FenderLogo,
    description: 'Thương hiệu guitar điện hàng đầu thế giới, nổi tiếng với các dòng Stratocaster và Telecaster',
    founded: '1946',
    origin: 'Hoa Kỳ',
    categories: ['Guitar Điện', 'Guitar Bass', 'Amplifiers']
  },
  {
    id: 2,
    name: 'Gibson',
    logo: GibsonLogo,
    description: 'Nhà sản xuất guitar với lịch sử hơn 100 năm, biểu tượng của rock and roll',
    founded: '1902',
    origin: 'Hoa Kỳ',
    categories: ['Guitar Điện', 'Guitar Acoustic', 'Guitar Bass']
  },
  {
    id: 3,
    name: 'Yamaha',
    logo: YamahaLogo,
    description: 'Tập đoàn sản xuất nhạc cụ đa dạng, từ piano đến guitar và trống',
    founded: '1887',
    origin: 'Nhật Bản',
    categories: ['Piano', 'Guitar', 'Trống', 'Kèn']
  },
  {
    id: 4,
    name: 'Roland',
    logo: RolandLogo,
    description: 'Thương hiệu hàng đầu về nhạc cụ điện tử và thiết bị âm thanh',
    founded: '1972',
    origin: 'Nhật Bản',
    categories: ['Piano Điện', 'Trống Điện', 'Synthesizers']
  },
  {
    id: 5,
    name: 'Martin',
    logo: MartinLogo,
    description: 'Biểu tượng của guitar acoustic cao cấp với chất lượng âm thanh xuất sắc',
    founded: '1833',
    origin: 'Hoa Kỳ',
    categories: ['Guitar Acoustic', 'Guitar Classic']
  },
  {
    id: 6,
    name: 'Ibanez',
    logo: IbanezLogo,
    description: 'Thương hiệu guitar được ưa chuộng bởi các nghệ sĩ metal và rock',
    founded: '1957',
    origin: 'Nhật Bản',
    categories: ['Guitar Điện', 'Guitar Bass', 'Guitar Acoustic']
  }
];

const Brands = () => {
  return (
    <div style={{ minHeight: '100vh', minHeight: '100dvh', background: 'linear-gradient(to bottom, #eaf2fb 0%, #4596e6 100%)', paddingBottom: 120 }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Thương Hiệu Nổi Tiếng</h1>
          <p className="text-muted fs-5">Khám phá các thương hiệu nhạc cụ hàng đầu thế giới</p>
        </div>

        <div className="row g-4">
          {brands.map((brand) => (
            <div key={brand.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 brand-card shadow-sm">
                <div className="card-body text-center">
                  <div className="p-4" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <h3 className="card-title mt-3">{brand.name}</h3>
                  <p className="text-muted mb-2">
                    <small>Thành lập: {brand.founded} | {brand.origin}</small>
                  </p>
                  <p className="card-text">{brand.description}</p>
                  <div className="mb-3">
                    {brand.categories.map((category, index) => (
                      <span key={index} className="badge bg-light text-dark me-2 mb-2">
                        {category}
                      </span>
                    ))}
                  </div>
                  <Link to={`/category/${brand.name.toLowerCase()}`} className="btn btn-outline-dark">
                    Xem Sản Phẩm
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>
          {`
            .brand-card {
              transition: transform 0.2s;
            }
            .brand-card:hover {
              transform: translateY(-5px);
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Brands; 