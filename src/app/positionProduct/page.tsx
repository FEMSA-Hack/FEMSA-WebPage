"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PositionProductPage() {
  const [standImageUrl, setStandImageUrl] = useState<string | null>(null);
  const [standImageData, setStandImageData] = useState<any>(null);

  useEffect(() => {
    const url = localStorage.getItem("standImageUrl");
    setStandImageUrl(url);
    const data = localStorage.getItem("standImageData");
    if (data) {
      setStandImageData(JSON.parse(data));
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full pb-30 px-4 bg-gradient-to-br from-blue-50 to-pink-50">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-[#e60026] drop-shadow-lg tracking-wide">
        Producto Acomodado en el Stand
      </h2>
      {standImageUrl ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full max-w-7xl">
          {standImageUrl && (
            <div className="flex-shrink-0">
              <Image
                src={standImageUrl}
                alt="Producto acomodado"
                width={600}
                height={600}
                className="rounded-3xl shadow-2xl max-w-full h-auto border-4 border-[#e60026]"
                priority
              />
            </div>
          )}
          {standImageData && (
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-gray-300 p-10 w-full max-w-lg mt-12 md:mt-0">
              <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">Información de la Imagen</h3>
              <div className="space-y-6 text-gray-700 text-2xl">
                {"clase" in standImageData ? (
                  <>
                    <div>
                      <span className="font-semibold">Clase:</span> {standImageData.clase ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Fila:</span> {standImageData.fila ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Columna:</span> {standImageData.columna ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">X:</span> {standImageData.x ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Y:</span> {standImageData.y ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Width:</span> {standImageData.width ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Height:</span> {standImageData.height ?? "-"}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="font-semibold">Clases detectadas:</span> {standImageData.clases_detectadas?.join(", ") ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Clases coincidentes:</span> {standImageData.clases_coincidentes?.join(", ") ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Clases faltantes:</span> {standImageData.clases_faltantes?.join(", ") ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Porcentaje coincidencia:</span> {standImageData.porcentaje_coincidencia ?? "-"}%
                    </div>
                    <div>
                      <span className="font-semibold">Cumple umbral:</span> {standImageData.cumple_umbral ? "Sí" : "No"}
                    </div>
                    {standImageData.alerta && (
                      <div className="text-red-600 font-bold">{standImageData.alerta}</div>
                    )}
                    <div>
                      <span className="font-semibold">Productos en posición correcta:</span> {standImageData.productos_posicion_correcta?.join(", ") ?? "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Productos en posición incorrecta:</span>{" "}
                      {standImageData.productos_posicion_incorrecta?.length
                        ? standImageData.productos_posicion_incorrecta.map((p: any) => (
                            <div key={p.class}>
                              <span className="font-semibold">{p.class}:</span> {p.detalles}
                            </div>
                          ))
                        : "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Porcentaje posiciones correctas:</span> {standImageData.porcentaje_posiciones_correctas ?? "-"}%
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-2xl text-gray-600 mt-10">No hay imagen para mostrar.</p>
      )}
    </section>
  );
}