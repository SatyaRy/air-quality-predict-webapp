from pydantic import BaseModel
class PM25Input(BaseModel):
    Temperature: float
    Humidity: float
    Wind_Speed_kmh: float
    Visibility: float
    Pressure: float
    so2: float
    no2: float
    Rainfall: float
    PM10: float
    AQI: float