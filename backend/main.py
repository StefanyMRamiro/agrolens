import os
from PIL import Image
import numpy as np
import uvicorn
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from dotenv import load_dotenv
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile

load_dotenv()

app = FastAPI()

model = tf.keras.models.load_model(os.getenv("MODEL_PATH"))

origins = ["*"]
methods = ["*"]
headers = ["*"]

app.add_middleware(
    CORSMiddleware, 
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = methods,
    allow_headers = headers    
)

@app.get("/ping")
def ping():
    return "pong"

@app.post("/analyze")
def analyse_picture(file: UploadFile):
    img = Image.open(file.file).resize((224, 224))
    
    input_arr = tf.keras.preprocessing.image.img_to_array(img)
    input_arr = np.array([input_arr])
    input_arr = input_arr.astype('float32') / 255.  # This is VERY important

    predictions = model.predict(input_arr)

    threshold = 0.5

    if predictions[0][0] > threshold:
        result = "Sonchus spp."
    else:
        result = "Sida spp."

    return {"filename": file.filename, "prediction": result, "confidence": float(predictions[0][0])}