from fastapi import APIRouter, HTTPException
from src.schemas.air_quality_schema import PM25Input
import pandas as pd
import joblib

airQuality = APIRouter()

@airQuality.get("/")
async def root():
    return {"message": "success"}

# Load the model
model = joblib.load("src/model/xgboost_pm25_model.pkl")

@airQuality.post("/api/v1/predict")
async def createData(data: PM25Input):
    try:
        # Convert input data to DataFrame
        input_data = pd.DataFrame([data.model_dump()])

        # Rename fields to match model
        input_data = input_data.rename(columns={
            'Wind_Speed_kmh': 'WindSpeedkmh',
            'no2': 'no2',
            'so2': 'so2'
        })

        # Define required features for the model
        required_features = [
            'Temperature', 'Humidity', 'WindSpeedkmh', 'Visibility', 'Pressure',
            'so2', 'no2', 'Rainfall', 'PM10', 'AQI'
        ]
        # Check for missing features
        missing_features = [f for f in required_features if f not in input_data.columns]
        if missing_features:
            raise ValueError(f"Missing required features: {missing_features}")

        # Ensure all required features are present and in correct order
        input_data = input_data[required_features]

        # Make prediction
        prediction = model.predict(input_data)[0]

        return {
            "predicted_pm25": float(prediction),
            "message": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during prediction: {str(e)}")