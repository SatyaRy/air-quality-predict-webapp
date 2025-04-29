# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from src.controller.air_quality import airQuality
from mangum import Mangum 

# Create the FastAPI app instance
app = FastAPI()

# Add CORS middleware to allow requests from the frontend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://127.0.0.1"
    ],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",  # Allows any port on localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include your routers
app.include_router(airQuality)

# Mangum handler for AWS Lambda compatibility
handler = Mangum(app)