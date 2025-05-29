import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    hometown: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Đăng ký tài khoản</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Họ tên</label>
                  <input name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ngày sinh</label>
                  <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Quê quán</label>
                  <input name="hometown" value={formData.hometown} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Địa chỉ hiện tại</label>
                  <input name="address" value={formData.address} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số điện thoại</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input name="password" type="password" value={formData.password} onChange={handleChange} className="form-control" required minLength={6} />
                </div>
                <button type="submit" className="btn btn-success w-100">Đăng ký</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
