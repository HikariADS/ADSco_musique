import React from 'react';
import { useNavigate } from 'react-router-dom';

function WebService() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="bg-light p-4 rounded shadow-sm mb-4">
        <h2>Web Development</h2>
        <p>Chúng tôi thiết kế và lập trình website hiện đại, hiệu suất cao, chuẩn SEO với React, Next.js, hoặc các CMS như WordPress, Strapi.</p>
        <button className="btn btn-primary mt-3" onClick={() => alert('Liên hệ thành công! Chúng tôi sẽ phản hồi sớm.')}>
          Liên hệ để đặt dịch vụ
        </button>
      </div>
    </div>
  );
}

export default WebService;
