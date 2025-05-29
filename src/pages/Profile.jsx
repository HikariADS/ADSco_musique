import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateAvatar } = useAuth();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  if (!user) return <div className="container py-5 text-center">Bạn cần đăng nhập để xem trang cá nhân.</div>;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      await updateAvatar(file);
      setPreview(null);
    } catch (err) {
      setError('Upload thất bại!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 text-center">
              <div className="mb-4">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={preview || (user.avatar ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=128`)}
                    alt="avatar"
                    style={{ width: 128, height: 128, borderRadius: '50%', objectFit: 'cover', border: '4px solid #eee' }}
                  />
                  <form onSubmit={handleUpload} style={{ marginTop: 12 }}>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => fileInputRef.current.click()}
                      style={{ marginRight: 8 }}
                    >
                      Chọn ảnh
                    </button>
                    {preview && (
                      <button
                        type="submit"
                        className="btn btn-success btn-sm"
                        disabled={uploading}
                      >
                        {uploading ? 'Đang tải...' : 'Lưu ảnh'}
                      </button>
                    )}
                  </form>
                  {error && <div className="text-danger mt-2">{error}</div>}
                </div>
              </div>
              <h2 className="mb-2">{user.name}</h2>
              <div className="text-muted mb-3">{user.email}</div>
              <div className="text-start mx-auto" style={{ maxWidth: 350 }}>
                <div><b>Ngày sinh:</b> {user.dob || <span className="text-muted">Chưa cập nhật</span>}</div>
                <div><b>Quê quán:</b> {user.hometown || <span className="text-muted">Chưa cập nhật</span>}</div>
                <div><b>Địa chỉ:</b> {user.address || <span className="text-muted">Chưa cập nhật</span>}</div>
                <div><b>Số điện thoại:</b> {user.phone || <span className="text-muted">Chưa cập nhật</span>}</div>
                <div><b>Vai trò:</b> {user.role || 'user'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 