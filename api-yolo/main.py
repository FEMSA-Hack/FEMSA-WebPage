from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import cv2
import numpy as np
from ultralytics import YOLO
import uuid
import os

app = FastAPI()
model = YOLO("yolov8n.pt")  # O el modelo personalizado
UPLOAD_FOLDER = "images"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def get_planograma_pos(x_center, y_center, img_shape, filas=5, columnas=12):
    alto, ancho, _ = img_shape
    altura_charola = alto / filas
    ancho_posicion = ancho / columnas
    charola = filas - int(y_center // altura_charola)
    posicion = int(x_center // ancho_posicion) + 1
    return charola, posicion

@app.post("/procesar/")
async def procesar_imagen(file: UploadFile = File(...)):
    contents = await file.read()
    np_arr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    results = model(img)[0]

    detecciones = []
    for box in results.boxes:
        cls_id = int(box.cls[0])
        cls_name = results.names[cls_id]
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        x_center = (x1 + x2) / 2
        y_center = (y1 + y2) / 2
        charola, posicion = get_planograma_pos(x_center, y_center, img.shape)

        detecciones.append({
            "producto": cls_name,
            "charola": charola,
            "posicion": posicion
        })

        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        label = f"{cls_name} (C{charola}-P{posicion})"
        cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX,
                    0.5, (255, 0, 0), 2)

    # Guardar la imagen con resultados
    filename = f"{uuid.uuid4()}.jpg"
    path = os.path.join(UPLOAD_FOLDER, filename)
    cv2.imwrite(path, img)

    return JSONResponse(content={
        "resultado_img": f"/{path}",
        "productos": detecciones
    })
