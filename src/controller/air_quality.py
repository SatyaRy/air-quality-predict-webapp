from fastapi import APIRouter


airQualityRoute = APIRouter(
)


@airQualityRoute.get("/api/v1/")
async def getData():
    return {"message":"success"}