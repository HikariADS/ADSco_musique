import React from 'react';
import './BlogBlock.css';
import guitar from '../assets/guitar1.webp';
import piano from '../assets/piano1.webp';
import drum from '../assets/drum1.webp';

const blogs = [
  {
    id: 1,
    title: '5 Lý Do Nên Học Guitar',
    image: guitar,
    desc: 'Guitar là nhạc cụ tuyệt vời để bắt đầu hành trình âm nhạc. Dưới đây là 5 lý do bạn nên thử học guitar ngay hôm nay!',
    link: '#',
  },
  {
    id: 2,
    title: 'Cách Chọn Đàn Piano Cho Người Mới',
    image: piano,
    desc: 'Bạn đang phân vân chọn đàn piano đầu tiên? Xem ngay hướng dẫn chọn đàn phù hợp với nhu cầu và ngân sách.',
    link: '#',
  },
  {
    id: 3,
    title: 'Tập Trống Cơ Bản Cho Người Mới',
    image: drum,
    desc: 'Bắt đầu với những bài tập trống cơ bản giúp bạn làm chủ tiết tấu và nhịp điệu.',
    link: '#',
  },
];

function BlogBlock() {
  return (
    <section className="blog-block py-5">
      <div className="container">
        <h2 className="blog-title mb-4 text-center">Blog & Tin Tức</h2>
        <div className="row gx-4 gy-4 justify-content-center">
          {blogs.map(blog => (
            <div key={blog.id} className="col-12 col-md-4 d-flex">
              <div className="blog-card w-100">
                <div className="blog-img-wrap">
                  <img src={blog.image} alt={blog.title} className="blog-img" />
                </div>
                <div className="blog-info">
                  <div className="blog-card-title">{blog.title}</div>
                  <div className="blog-desc">{blog.desc}</div>
                  <a href={blog.link} className="btn btn-outline-primary btn-sm mt-2">Xem chi tiết</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogBlock; 