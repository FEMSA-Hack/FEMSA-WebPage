"use client";
// pages/dashboard.tsx
import React, { useEffect, useState } from "react";

interface Diferencia {
  producto: string;
  posicion_antes: string;
  posicion_despues: string;
}

interface Resultado {
  diferencias: Diferencia[];
  imagen_resultado: string;
}

export default function DashboardPage() {
  const [resultado, setResultado] = useState<Resultado | null>(null);

  // Simulación de carga (en producción usaría props, contexto, router.query, etc.)
  useEffect(() => {
    const cargarDatos = async () => {
      const res = await fetch("http://localhost:8000/procesar/ejemplo", {
        method: "GET"
      });
      const data = await res.json();
      setResultado(data);
    };

    cargarDatos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Dashboard de Estante</h1>

      {resultado ? (
        <>
          <div>
            <h2>Diferencias Detectadas:</h2>
            <table border={1} cellPadding={10}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Antes</th>
                  <th>Después</th>
                </tr>
              </thead>
              <tbody>
                {resultado.diferencias.map((diff, idx) => (
                  <tr key={idx}>
                    <td>{diff.producto}</td>
                    <td>{diff.posicion_antes}</td>
                    <td>{diff.posicion_despues}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h2>Visualización YOLO</h2>
            <img
              src={`data:image/png;base64,${resultado.imagen_resultado}`}
              alt="Imagen resultado"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </>
      ) : (
        <p>Cargando resultados...</p>
      )}
    </div>
  );
}
