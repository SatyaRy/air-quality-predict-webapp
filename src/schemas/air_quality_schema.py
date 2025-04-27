from pydantic import BaseModel
class PM25Input(BaseModel):
    AQI: float
    PM10_µgm3: float
    NO2_ppb: float
    Temperature_C: float
    Humidity_: float
    Wind_Speed_ms: float