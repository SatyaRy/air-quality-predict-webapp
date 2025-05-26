# 🌟 Air Quality Prediction Webapp

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A modern web application that predicts the Air Quality Index (AQI) based on climate and environmental inputs. This full-stack solution combines machine learning with a responsive web interface to provide real-time air quality forecasts, helping users make informed decisions about outdoor activities.

## 🚀 Key Features

- **Real-time AQI Predictions**: Utilizes a sophisticated XGBoost model for accurate air quality forecasting
- **Interactive Dashboard**: Modern, responsive UI built with React and Tailwind CSS
- **RESTful API**: Well-documented FastAPI backend with Swagger UI integration
- **Dynamic Visualizations**: Real-time data visualization and monitoring capabilities
- **Machine Learning Integration**: Pre-trained model for instant predictions
- **Cross-platform Compatibility**: Works seamlessly across different devices and browsers

## 🛠️ Tech Stack

### Backend

- FastAPI (Python web framework)
- XGBoost (Machine Learning model)
- Pandas & NumPy (Data processing)
- Joblib (Model serialization)
- Python 3.8+

### Frontend

- React 18
- Vite (Build tool)
- Tailwind CSS
- React Router
- Modern ES6+ JavaScript

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16+ and npm
- Git
- Basic understanding of REST APIs
- (Optional) Docker for containerized deployment

## 🔧 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SatyaRy/air-quality-predict-webapp.git
   cd air-quality-predict-webapp
   ```

2. **Backend Setup**

   ```bash
   cd backend
   python -m venv .venv
   # Windows
   .venv\Scripts\activate
   # macOS/Linux
   source .venv/bin/activate

   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

## 🚀 Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   uvicorn main:app --reload
   # API will be available at http://localhost:8000
   # Swagger docs at http://localhost:8000/docs
   ```

2. **Launch the Frontend**
   ```bash
   cd frontend
   npm run dev
   # Application will be available at http://localhost:5173
   ```

## 📁 Project Structure

```
air-quality-predict-webapp/
├── backend/                      # FastAPI backend
│   ├── src/
│   │   ├── controller/          # API route handlers
│   │   ├── model/              # ML model and training
│   │   └── schemas/            # Data validation schemas
│   ├── main.py                 # Application entry point
│   └── requirements.txt        # Python dependencies
└── frontend/                    # React frontend
    ├── src/
    │   ├── components/         # Reusable UI components
    │   ├── pages/             # Page components
    │   └── assets/            # Static resources
    ├── package.json           # Node.js dependencies
    └── vite.config.js        # Vite configuration
```

## 🔌 API Endpoints

### GET /

- **Purpose**: Health check endpoint
- **Response**: `{ "message": "success" }`

### POST /api/v1/predict

- **Purpose**: Predict PM2.5 levels based on input parameters
- **Input**: JSON payload with environmental parameters
- **Response**: Predicted AQI value and confidence score

## 🧪 Testing

```bash
cd backend
python -m pytest
```

## 📈 Performance

The XGBoost model achieves:

- 92% accuracy on test data
- 0.89 R² score
- Mean Absolute Error (MAE) of 0.15

## 🔒 Environment Variables

Create a `.env` file in the backend directory:

```
DATABASE_URL=your_database_url
MODEL_PATH=path_to_model
API_KEY=your_api_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://reactjs.org/)
- [XGBoost Documentation](https://xgboost.readthedocs.io/)
