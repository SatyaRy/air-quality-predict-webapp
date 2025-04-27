from pydantic import BaseModel
class PM25Input(BaseModel):
    AQI: float
    PM10_µgm3: float
    NO2_ppb: float
    Temperature_C: float
    Humidity_: float
    SO2_ppb: float
    CO_ppm: float
    O3_ppb: float
    PM25_µgm3: float
    Wind_Speed_ms: float
    PM25_1hr_ago: float
    PM25_2hr_ago: float 
    pm25_rolling_mean3: float