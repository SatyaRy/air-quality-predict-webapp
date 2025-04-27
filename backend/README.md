# Air Quality Prediction Webapp

A web application that predicts the Air Quality Index (AQI) based on climate and environmental inputs. Powered by a Random Forest Regressor, this app provides real-time AQI forecasts to help users plan outdoor activities and monitor air quality. Built with a FastAPI backend and React frontend.

## Features
- Input climate parameters (e.g., temperature, humidity, wind speed) to predict AQI.
- Real-time predictions using a pre-trained Random Forest model.
- Responsive and intuitive UI built with React.
- RESTful API for programmatic access to predictions.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Model Training](#model-training)

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip and npm
- Git
### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SatyaRy/air-quality-predict-webapp.git
   cd air-quality-predict-webapp
2. **Set Up the Backend**:
``` bash
cd backend
python -m venv .venv
source .venv/bin/activate  
# On Windows: venv\Scripts\activate
# On Mac: source .venv/bin/activate
pip install -r requirements.txt
```
3. **Usage**:
Start the backend server:
``` bash
cd backend
uvicorn main:app --reload
FastAPI runs on http://localhost:8000.
API docs available at http://localhost:8000/docs.
```

## Project Structure
```bash
└── air-quality-predict-webapp/
    ├── src/
    │   ├── controller/
    │   │   └── air_quality.py
    │   ├── database/
    │   │   └── config.py
    │   ├── model/
    │   │   ├── global_air_quality.csv
    │   │   ├── xgboost_pm25_model.pkl
    │   │   └── train_model.py
    │   └── schemas/
    │       └── air_quality_schema.py
    ├── main.py
    ├── test/
    │   └── test.py
    ├── requirements.txt
    └── vercel.json
```
