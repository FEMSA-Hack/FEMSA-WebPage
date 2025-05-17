"use client";
// pages/upload.tsx
import React, { useState } from "react";

export default function UploadPage() {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [responseImage, setResponseImage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!image1 || !image2 || !csvFile) return;

  const formData = new FormData();
  formData.append("archivo1", image1);
  formData.append("archivo2", image2);
  formData.append("csv_productos", csvFile);

  try {
    const res = await fetch("http://127.0.0.1:8000/procesar/", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Error en la respuesta: ${res.status}`);
    }

    const data = await res.json();
    console.log("Datos detectados:", data);
    setResponseImage(`data:image/png;base64,${data.imagen_resultado}`);
  } catch (error) {
    console.error("Error en fetch:", error);
    alert("Ocurrió un error al enviar los archivos.");
  }
};

  return (
    <div>
      <h1>Subir Archivos</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={e => setImage1(e.target.files?.[0] || null)} />
        <input type="file" accept="image/*" onChange={e => setImage2(e.target.files?.[0] || null)} />
        <input type="file" accept=".csv" onChange={e => setCsvFile(e.target.files?.[0] || null)} />
        <button type="submit">Enviar</button>
      </form>

      {responseImage && (
        <div>
          <h2>Resultado:</h2>
          <img src={responseImage} alt="Resultado YOLO" />
        </div>
      )}
    </div>
  );
}
