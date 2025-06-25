# Finance-Tracker
a web application for managing personal finances.

# 💰 Financial Tracker

A full-stack application for tracking income, expenses, and currency conversions with user authentication.

![App Screenshot](https://via.placeholder.com/800x400?text=Financial+Tracker+Screenshot)

## 🌟 Features
- **User Authentication**: Secure JWT-based login/signup
- **Financial Tracking**: Record income and expenses
- **Currency Conversion**: Real-time USD↔EUR conversion via OpenExchangeRates
- **Dashboard**: Visualize financial data with summaries and trends
- **Responsive UI**: Works on desktop and mobile devices

## 🛠 Tech Stack
| **Layer**       | **Technologies**                     |
|-----------------|--------------------------------------|
| **Frontend**    | React 18, Vite, Tailwind CSS         |
| **Backend**     | Node.js, Express, MongoDB            |
| **Authentication** | JWT, bcryptjs                      |
| **API**         | Axios with interceptors              |

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB Atlas account or local MongoDB
- OpenExchangeRates API key (free tier available)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/financial-tracker.git
   cd financial-tracker

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# backend/.env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/finance-tracker
JWT_SECRET=your_jwt_secret_key
OXR_KEY=your_openexchangerates_api_key
PORT=5000

# frontend/.env
VITE_API_URL=http://localhost:5000

# Start backend (from backend directory)
npm start

# Start frontend (from frontend directory)
npm run dev