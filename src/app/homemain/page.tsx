"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ImageUploadBox({ title }: { title: string }) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6  flex flex-col items-center w-full max-w-md ">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <label className="mb-4 w-full cursor-pointer">
      <span className="block bg-gray-100 border border-gray-300 rounded px-4 py-2 text-center text-gray-700 hover:bg-gray-200 transition truncate overflow-hidden w-full">
        {image ? "Archivo seleccionado" : "Seleccionar archivo"}
      </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
      
      {image && (
        <Image
          src={image}
          alt={`Vista previa de ${title}`}
          className="max-h-64 rounded border"
          width={256}
          height={256}
        />
      )}
    </div>
  );
}

// ...existing code...
export default function HomePage() {
  const router = useRouter();

  const handleRealograma = () => {
    router.push("/dashboardRealograma");
  };

  const handleProducto = () => {
    router.push("/positionProduct");
  };
  // Hola
  return (
    <section className="flex flex-col justify-center items-center pt-32 min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
      <h2 className="text-4xl font-extrabold mb-16 text-center text-[#e60026] drop-shadow-lg tracking-wide">
        Dashboard de Imágenes
      </h2>
      <div className="flex flex-col md:flex-row gap-16 justify-center items-start text-black">
        {/* Realograma Section */}
        <div className="flex flex-col items-center bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-3xl shadow-2xl border-4 border-blue-400 p-12 hover:scale-105 transition-transform duration-300 w-[350px]">
          <span className="mb-4 px-4 py-1 rounded-full bg-blue-600 text-white font-bold shadow-lg text-lg">
            Realograma
          </span>
          <ImageUploadBox title="Subir Realograma" />
          <button
            onClick={handleRealograma}
            className="mt-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-4 text-xl font-extrabold shadow-xl hover:from-blue-800 hover:to-blue-600 hover:scale-110 transition-all border-2 border-blue-700"
          >
            Enviar Realograma
          </button>
        </div>
        {/* Producto Section */}
        <div className="flex flex-col items-center bg-gradient-to-br from-green-100 via-white to-green-200 rounded-3xl shadow-2xl border-4 border-green-400 p-12 hover:scale-105 transition-transform duration-300 w-[350px]">
          <span className="mb-4 px-4 py-1 rounded-full bg-green-600 text-white font-bold shadow-lg text-lg">
            Producto
          </span>
          <ImageUploadBox title="Subir Producto" />
          <button
            onClick={handleProducto}
            className="mt-8 rounded-full bg-gradient-to-r from-green-600 to-green-400 text-white px-10 py-4 text-xl font-extrabold shadow-xl hover:from-green-800 hover:to-green-600 hover:scale-110 transition-all border-2 border-green-700"
          >
            Enviar Producto
          </button>
        </div>
      </div>
    </section>
  );
}
// ...existing code...