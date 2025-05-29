import React from 'react';

function Profile({ user }) {
  if (!user) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 32, minWidth: 340, maxWidth: 400, textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=0D8ABC&color=fff&size=128`}
            alt="avatar"
            style={{ width: 128, height: 128, borderRadius: '50%', marginBottom: 16, objectFit: 'cover', border: '4px solid #eee' }}
          />
          <h2 style={{ margin: '8px 0 4px 0' }}>{user.name || 'Chưa đặt tên'}</h2>
          <div style={{ color: '#888', marginBottom: 16 }}>@{user.email}</div>
          <div style={{ textAlign: 'left', width: '100%', margin: '0 auto' }}>
            {user.dob && <div><b>Ngày sinh:</b> {user.dob}</div>}
            {user.phone && <div><b>Điện thoại:</b> {user.phone}</div>}
            {user.address && <div><b>Địa chỉ:</b> {user.address}</div>}
            {user.hometown && <div><b>Quê quán:</b> {user.hometown}</div>}
            <div><b>Vai trò:</b> {user.role || 'user'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 