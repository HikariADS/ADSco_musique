import React from 'react';
import { useNavigate } from 'react-router-dom';

function UIUXService() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="bg-light p-4 rounded shadow-sm mb-4">
        <h2>UI/UX Design</h2>
        <p>Chúng tôi thiết kế giao diện đẹp mắt, trải nghiệm người dùng mượt mà, phù hợp với mục tiêu kinh doanh và thương hiệu.</p>
        <button className="btn btn-primary mt-3" onClick={() => alert('Liên hệ thành công! Chúng tôi sẽ phản hồi sớm.')}>
          Liên hệ để đặt dịch vụ
        </button>
      </div>
    </div>
  );
}

export default UIUXService;
