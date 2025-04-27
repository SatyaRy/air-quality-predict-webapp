# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from src.controller.air_quality import airQuality
from mangum import Mangum 

# Create the FastAPI app instance
app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include your routers
app.include_router(airQuality)

# Mangum handler for AWS Lambda compatibility
handler = Mangum(app)