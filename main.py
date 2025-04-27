from fastapi import FastAPI
from src.controller.air_quality import airQuality
from mangum import Mangum 
app = FastAPI()
app.include_router(airQuality)
handler = Mangum(app)
