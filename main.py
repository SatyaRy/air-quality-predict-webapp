from fastapi import FastAPI
from src.controller.air_quality import airQualityRoute
app = FastAPI()

app.include_router(airQualityRoute)
