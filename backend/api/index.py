from fastapi import FastAPI
from mangum import Mangum
from src.controller.air_quality import router 

app = FastAPI()

# Include your routes
app.include_router(router)

# Mangum handler for Vercel
handler = Mangum(app)