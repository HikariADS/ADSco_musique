const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/adsco_musique')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Schema cho User
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: Boolean,
  phone: String,
  address: String
});

const User = mongoose.model('User', userSchema);

// Tạo tài khoản admin
async function createAdminAccount() {
  try {
    // Kiểm tra xem admin đã tồn tại chưa
    const existingAdmin = await User.findOne({ email: 'admin@adsco.com' });
    if (existingAdmin) {
      console.log('Admin account already exists');
      process.exit(0);
    }

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Tạo admin mới
    const admin = new User({
      name: 'Admin',
      email: 'admin@adsco.com',
      password: hashedPassword,
      isAdmin: true,
      phone: '0123456789',
      address: 'ADSco Musique'
    });

    await admin.save();
    console.log('Admin account created successfully');
    console.log('Email: admin@adsco.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin account:', error);
  } finally {
    process.exit(0);
  }
}

createAdminAccount(); 