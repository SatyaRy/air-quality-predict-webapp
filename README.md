# Air Quality Prediction Webapp

A web application that predicts the Air Quality Index (AQI) based on climate and environmental inputs. Powered by a Random Forest Regressor, this app provides real-time AQI forecasts to help users plan outdoor activities and monitor air quality. Built with a FastAPI backend and React frontend.

## Features
- Input climate parameters (e.g., temperature, humidity, wind speed) to predict AQI.
- Real-time predictions using a pre-trained Random Forest model.
- Responsive and intuitive UI built with React.
- RESTful API for programmatic access to predictions.

## Table of Contents
- [Project Structure](#project-structure)
- [Model Training](#model-training)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Project Structure
```bash
air-quality-predict-webapp/
├── backend/                  # FastAPI backend
│   ├── models/               # Pre-trained ML model files
│   ├── main.py               # Main FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── data/                 # Datasets or scripts for data preprocessing
├── frontend/                 # React frontend
│   ├── src/                  # React components and logic
│   ├── public/               # Static assets
│   └── package.json          # Node.js dependencies
├── docs/                     # Documentation (e.g., API specs, screenshots)
└── README.md                 # Project documentation
```
