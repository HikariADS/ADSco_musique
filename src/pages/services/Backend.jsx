import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackendService() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="bg-light p-4 rounded shadow-sm mb-4">
        <h2>Backend API</h2>
        <p>Chúng tôi phát triển hệ thống API mạnh mẽ với Node.js, Express, Django hoặc Laravel, bảo mật cao và dễ mở rộng.</p>
        <button className="btn btn-primary mt-3" onClick={() => alert('Liên hệ thành công! Chúng tôi sẽ phản hồi sớm.')}>
          Liên hệ để đặt dịch vụ
        </button>
      </div>
    </div>
  );
}

export default BackendService;
