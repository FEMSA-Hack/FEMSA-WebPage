"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PositionProductPage() {
  const [standImageUrl, setStandImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = localStorage.getItem("standImageUrl");
    setStandImageUrl(url);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pb-30">
      <h2 className="text-2xl font-bold mb-6">Producto Acomodado en el Stand</h2>
      {standImageUrl ? (
        <Image src={standImageUrl} alt="Producto acomodado" width={500} height={500} className="rounded shadow-lg max-w-lg" />
      ) : (
        <p>No hay imagen para mostrar.</p>
      )}
    </section>
  );
}