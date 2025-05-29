# ADSco - Audio Equipment E-commerce Platform

## Overview
ADSco is a full-stack e-commerce platform specializing in professional audio equipment. The application features a modern user interface, secure authentication, shopping cart functionality, and order management system.

## Features
- User authentication (login/register)
- Product browsing and searching
- Shopping cart management
- Order creation and tracking
- Responsive design
- Admin dashboard for order management

## Tech Stack
### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Context API for state management
- Bootstrap for styling
- React-toastify for notifications
- React-icons for UI icons

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication
- Mongoose ODM
- Nodemon for development
- Cors for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally
- npm or yarn package manager
- MongoDB Compass (recommended for database management)

### Required Dependencies

#### Frontend Dependencies
```bash
npm install react-router-dom @mui/material @emotion/react @emotion/styled
npm install axios react-toastify react-icons
npm install bootstrap @popperjs/core
npm install react-scripts --save
```

#### Backend Dependencies
```bash
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
npm install nodemon --save-dev
```

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ADSco-main
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create a `.env` file in the backend directory with the following content:
```
MONGODB_URI=mongodb://127.0.0.1:27017/adsco
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

1. Start MongoDB:
   - Make sure MongoDB service is running
   - Open MongoDB Compass and connect to: mongodb://127.0.0.1:27017
   - Create a database named 'adsco'

2. Start the backend server:
```bash
cd backend
npm run dev
```
The server will run on http://localhost:5000

3. Start the frontend application (in a new terminal):
```bash
cd ..
npm start
```
The application will run on http://localhost:3004

### Troubleshooting
- If you get script execution policy error in PowerShell:
  1. Open PowerShell as Administrator
  2. Run: `Set-ExecutionPolicy RemoteSigned`
  3. Type 'Y' to accept the changes

- If you get 'react-scripts' not found error:
  ```bash
  npm install react-scripts --save
  ```

- If MongoDB connection fails:
  1. Check if MongoDB service is running
  2. Verify the connection string in .env file
  3. Make sure the database name is 'adsco' not 'adsco_music'

## Project Structure
```
ADSco-main/
├── src/                    # Frontend source files
│   ├── components/        # React components
│   ├── contexts/         # Context providers
│   ├── pages/           # Page components
│   └── App.jsx          # Main application component
├── backend/              # Backend source files
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Express server setup
└── README.md            # Project documentation
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product

### Orders
- POST `/api/orders/create` - Create new order
- GET `/api/orders/user/orders` - Get user's orders
- GET `/api/orders/:id` - Get single order

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.
