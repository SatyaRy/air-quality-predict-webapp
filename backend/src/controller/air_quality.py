from fastapi import APIRouter,HTTPException
from src.schemas.air_quality_schema import PM25Input
import pandas as pd
import datetime
import joblib
airQuality = APIRouter()
@airQuality.get("/")
async def root():
    return {"message":"success"}
#model 
model = joblib.load("src/model/xgboost_pm25_model.pkl")
@airQuality.post("/api/v1/predict")
async def createData(data: PM25Input):
    try:
        input_data = pd.DataFrame([data.model_dump()])
        #add default time
        date = datetime.datetime.now()
        input_data['hour'] = date.hour
        input_data['PM10_µgm³'] = data.PM10_μgm3
        input_data['month'] = date.month
        input_data['day'] = date.day
        input_data['dayofweek'] = date.weekday()
        input_data['is_weekend'] = 1 if date.weekday() in [5, 6] else 0
        required_features = [
            'AQI', 'PM10_µgm³', 'NO2_ppb', 'SO2_ppb', 'CO_ppm', 'O3_ppb',
            'Temperature_C', 'Humidity_', 'Wind_Speed_ms',
            'hour', 'month', 'day', 'dayofweek', 'is_weekend',
            'PM25_1hr_ago', 'PM25_2hr_ago', 'pm25_rolling_mean3'
        ]
        missing_features = [f for f in required_features if f not in input_data.columns]
        if missing_features:
            raise ValueError(f"Missing required features: {missing_features}")
        prediction = model.predict(input_data[required_features])[0]
        return {
            "predicted_pm25": float(prediction),
            "message": "success",
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during prediction: {str(e)}")
    
    