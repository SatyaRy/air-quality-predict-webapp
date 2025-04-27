from fastapi import FastAPI
from src.controller.air_quality import airQuality
app = FastAPI()
app.include_router(airQuality)
