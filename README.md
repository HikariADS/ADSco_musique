# ADSco Musique - Musical Instruments E-commerce Website

A modern musical instruments e-commerce website built with React and Node.js, providing the best online shopping experience for users.

## Features

- 🎵 Product display by categories (Guitar, Piano, Drums, Toys)
- 🔍 Search products by name, description, and brand
- 🛒 Shopping cart and checkout
- 👤 User account management
- 💫 New products and promotions
- ⭐ Product ratings and reviews
- 📱 Responsive design

## Technologies Used

### Frontend
- React 18
- React Router v6
- Bootstrap 5
- Axios
- React Toastify
- React Slick (for slider)

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Installation

### Requirements
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation Steps

1. Clone repository
```bash
git clone https://github.com/your-username/ADSco_musique.git
cd ADSco_musique
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../
npm install
```

4. Create .env file in backend directory
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start backend server
```bash
cd backend
npm start
```

6. Start frontend (in a new terminal)
```bash
npm start
```

## Main Dependencies

### Frontend
```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.2",
    "bootstrap": "^5.3.2",
    "bootstrap-icons": "^1.11.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "react-slick": "^0.29.0",
    "react-toastify": "^9.1.3",
    "slick-carousel": "^1.8.1",
    "web-vitals": "^2.1.4"
  }
}
```

### Backend
```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.2",
    "nodemon": "^3.0.2"
  }
}
```

## Project Structure

```
ADSco_musique/
├── src/
│   ├── assets/         # Images and resources
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts
│   ├── pages/         # Main pages
│   └── config/        # Configuration
├── backend/
│   ├── controllers/   # Business logic
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── middleware/   # Middleware
└── public/          # Static resources
```

## Author

- Hoang Thien Quang
- Email: bebiumcc123@gmail.com

## License

MIT License
