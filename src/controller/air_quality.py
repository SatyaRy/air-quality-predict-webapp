from fastapi import APIRouter,HTTPException
from src.schemas.air_quality_schema import PM25Input
import pandas as pd
import datetime
import joblib
airQuality = APIRouter(
)
@airQuality.get("/")
async def root():
    return {"message":"success"}

df = pd.read_csv("src/model/global_air_quality_dataset.csv")
df = df.rename(columns={
    'CO (ppm)': 'CO_ppm',
    'SO2 (ppb)': 'SO2_ppb',  # Adjust based on actual name
    'O3 (ppb)': 'O3_ppb',
    'Wind Speed (m/s)': 'Wind_Speed_ms',
    'PM2.5 (µg/m³)': 'PM25_µgm3',
    'PM10 (µg/m³)': 'PM10_µgm3'
})
df.columns = df.columns.str.replace(' ', '_').str.replace(r'[^\w]', '', regex=True)
defaults = {
    'SO2_ppb': df['SO2_ppb'].mean() if 'SO2_ppb' in df.columns else 10.0,
    'CO_ppm': df['CO_ppm'].mean() if 'CO_ppm' in df.columns else 5.02,
    'O3_ppb': df['O3_ppb'].mean() if 'O3_ppb' in df.columns else 30.0,
    'PM25': df['PM25_µgm3'].mean() if 'PM25_µgm3' in df.columns else 15.0
}

#model 
model = joblib.load("src/model/xgboost_pm25_model.pkl")
@airQuality.post("/api/v1/predict")
async def createData(data: PM25Input):
    try:
        input_data = pd.DataFrame([data.model_dump()])
        #add default
        date = datetime.datetime.now()
        input_data['hour'] = date.hour
        input_data['PM10_µgm³'] = data.PM10_μgm3
        input_data['month'] = date.month
        input_data['day'] = date.day
        input_data['dayofweek'] = date.weekday()
        input_data['is_weekend'] = 1 if date.weekday() in [5, 6] else 0
         # Add default values
        input_data['SO2_ppb'] = defaults['SO2_ppb']
        input_data['CO_ppm'] = defaults['CO_ppm']
        input_data['O3_ppb'] = defaults['O3_ppb']
        input_data['PM25_1hr_ago'] = defaults['PM25']
        input_data['PM25_2hr_ago'] = defaults['PM25']
        input_data['pm25_rolling_mean3'] = defaults['PM25']
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
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during prediction: {str(e)}")
    
    