from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cv2
import numpy as np
import base64
import csv
from typing import List
import tempfile
import os

# --- Cargar modelo YOLO ---
from ultralytics import YOLO
modelo = YOLO("yolov8n.pt")  # Asegúrate de tener tu modelo entrenado aquí

app = FastAPI()

# CORS para permitir frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def leer_csv_productos(csv_path):
    productos = []
    with open(csv_path, newline='', encoding="latin1") as csvfile:  # <-- Cambia aquí
        reader = csv.reader(csvfile)
        for row in reader:
            if row:
                productos.append(row[0].strip())
    return productos

def detectar_productos(imagen_np):
    resultados = modelo.predict(imagen_np)[0]
    objetos = []
    for box in resultados.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        conf = float(box.conf[0])
        clase = int(box.cls[0])
        nombre = modelo.names[clase]
        cx = int((x1 + x2) / 2)
        cy = int((y1 + y2) / 2)
        objetos.append({"nombre": nombre, "posicion": (cx, cy), "box": (x1, y1, x2, y2)})
    return objetos

def comparar_productos(lista1, lista2):
    diferencias = []
    for i, obj1 in enumerate(lista1):
        if i >= len(lista2):
            break
        obj2 = lista2[i]
        if obj1['nombre'] != obj2['nombre']:
            diferencias.append({
                "charola": i // 5 + 1,
                "columna": i % 5 + 1,
                "esperado": obj1['nombre'],
                "actual": obj2['nombre']
            })
    return diferencias

def dibujar_diferencias(imagen_np, diferencias, objetos):
    for diff in diferencias:
        idx = (diff['charola'] - 1) * 5 + (diff['columna'] - 1)
        if idx < len(objetos):
            x1, y1, x2, y2 = objetos[idx]['box']
            cv2.rectangle(imagen_np, (x1, y1), (x2, y2), (0, 0, 255), 3)
            cv2.putText(imagen_np, f"{diff['esperado']} -> {diff['actual']}", (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
    return imagen_np

@app.post("/procesar/")
async def procesar(
    archivo1: UploadFile = File(...),
    archivo2: UploadFile = File(...),
    csv_productos: UploadFile = File(...)
):
    with tempfile.NamedTemporaryFile(delete=False) as temp1:
        temp1.write(await archivo1.read())
        path1 = temp1.name
    with tempfile.NamedTemporaryFile(delete=False) as temp2:
        temp2.write(await archivo2.read())
        path2 = temp2.name
    with tempfile.NamedTemporaryFile(delete=False, suffix=".csv") as temp_csv:
        temp_csv.write(await csv_productos.read())
        csv_path = temp_csv.name

    productos_validos = leer_csv_productos(csv_path)

    imagen1 = cv2.imread(path1)
    imagen2 = cv2.imread(path2)

    lista1 = detectar_productos(imagen1)
    lista2 = detectar_productos(imagen2)

    diferencias = comparar_productos(lista1, lista2)
    imagen_resultado = dibujar_diferencias(imagen2.copy(), diferencias, lista2)

    _, buffer = cv2.imencode(".png", imagen_resultado)
    imagen_base64 = base64.b64encode(buffer).decode("utf-8")

    os.remove(path1)
    os.remove(path2)
    os.remove(csv_path)

    return JSONResponse({
        "diferencias": diferencias,
        "imagen_resultado": imagen_base64
    })
