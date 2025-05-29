import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '', dob: '', hometown: '', address: '', phone: '', email: '', password: '', confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        alert(data.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi kết nối đến server');
    }
  };

  return (
    <div className="col-md-8 offset-md-2">
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label>Họ tên</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Ngày sinh</label>
            <input type="date" name="dob" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Quê quán</label>
            <input type="text" name="hometown" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Địa chỉ hiện tại</label>
            <input type="text" name="address" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Số điện thoại</label>
            <input type="tel" name="phone" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Email</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Mật khẩu</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Nhập lại mật khẩu</label>
            <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
          </div>
        </div>
        <button className="btn btn-success mt-2" type="submit">Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
