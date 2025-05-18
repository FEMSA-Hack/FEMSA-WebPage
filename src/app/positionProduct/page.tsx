"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PositionProductPage() {
  const [standImageUrl, setStandImageUrl] = useState<string | null>(null);
  const [standImageData, setStandImageData] = useState<{
    clase?: string;
    fila?: number;
    columna?: number;
  } | null>(null);

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
          {standImageData && (
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-gray-300 p-10 w-full max-w-lg mt-12 md:mt-0">
              <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">Información de la Imagen</h3>
              <div className="space-y-6 text-gray-700 text-2xl">
                <div>
                  <span className="font-semibold">Clase:</span> {standImageData.clase ?? "-"}
                </div>
                <div>
                  <span className="font-semibold">Fila:</span> {standImageData.fila ?? "-"}
                </div>
                <div>
                  <span className="font-semibold">Columna:</span> {standImageData.columna ?? "-"}
                </div>
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