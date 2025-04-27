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
