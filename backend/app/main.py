from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/detect-nose")
async def detect_nose(frame: UploadFile):
    # OpenCV nose detection logic here
    return {"coordinates": {"x": 0, "y": 0}}