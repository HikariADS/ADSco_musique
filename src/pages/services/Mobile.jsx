import React from 'react';
import { useNavigate } from 'react-router-dom';

function MobileService() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="bg-light p-4 rounded shadow-sm mb-4">
        <h2>Mobile App Development</h2>
        <p>Chúng tôi xây dựng ứng dụng iOS và Android chuyên nghiệp bằng Flutter, React Native hoặc native Swift/Kotlin.</p>
        <button className="btn btn-primary mt-3" onClick={() => alert('Liên hệ thành công! Chúng tôi sẽ phản hồi sớm.')}>
          Liên hệ để đặt dịch vụ
        </button>
      </div>
    </div>
  );
}

export default MobileService;
