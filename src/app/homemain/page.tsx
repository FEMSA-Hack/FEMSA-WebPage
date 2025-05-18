"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ImageUploadBox({
  title,
  onImageChange,
}: {
  title: string;
  onImageChange: (file: File | null) => void;
}) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    onImageChange(file);
  };

  return (
    <div className="bg-white rounded shadow p-6 flex flex-col items-center w-full max-w-md ">
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

export default function HomePage() {
  const router = useRouter();
  const [realogramaFile, setRealogramaFile] = useState<File | null>(null);
  const [productoFile, setProductoFile] = useState<File | null>(null);
  const [productoBase64, setProductoBase64] = useState<string | null>(null);
  const [productoData, setProductoData] = useState<any>(null);

  // POST para producto (endpoint /uno)
  const handleProducto = async () => {
    if (!productoFile) {
      alert("Por favor selecciona una imagen de producto.");
      return;
    }
    const formData = new FormData();
    formData.append("file", productoFile);

    try {
      const response = await fetch("http://localhost:8000/api/uno", {
        method: "POST",
        body: formData,
        headers: { accept: "application/json" },
      });
      if (!response.ok) throw new Error("Error al enviar la imagen");
      const data = await response.json();
      if (data.imagen_base64) {
        const base64Img = `data:${data.content_type};base64,${data.imagen_base64}`;
        setProductoBase64(base64Img);
        setProductoData(data);
        localStorage.setItem("standImageUrl", base64Img);
        localStorage.setItem("standImageData", JSON.stringify(data));
        router.push("/positionProduct");
      } else {
        setProductoBase64(null);
        setProductoData(null);
        localStorage.removeItem("standImageUrl");
        localStorage.removeItem("standImageData");
        alert("No se detectó ninguna clase en la imagen.");
      }
    } catch (error) {
      alert("No se pudo enviar la imagen.");
    }
  };

  // POST para realograma (endpoint /dos)
  const handleRealograma = async () => {
    if (!realogramaFile) {
      alert("Por favor selecciona una imagen de realograma.");
      return;
    }
    const formData = new FormData();
    formData.append("file", realogramaFile);

    try {
      const response = await fetch("http://localhost:8000/api/dos", {
        method: "POST",
        body: formData,
        headers: { accept: "application/json" },
      });
      if (!response.ok) throw new Error("Error al enviar la imagen");
      const data = await response.json();
      // Si hay imagen_base64, guárdala, si no, guarda vacío
      const base64Img = data.imagen_base64
        ? `data:${data.content_type};base64,${data.imagen_base64}`
        : "";
      localStorage.setItem("standImageUrl", base64Img);
      localStorage.setItem("standImageData", JSON.stringify(data));
      router.push("/positionProduct");
    } catch (error) {
      alert("No se pudo enviar la imagen.");
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 pb-20">
      <h2 className="cal-sans-regular text-5xl font-extrabold mb-8 text-center text-[#e60026] drop-shadow-lg tracking-wide">
        PLAX
      </h2>
      <div className="flex flex-col md:flex-row gap-16 justify-center items-start text-black">
        {/* Realograma Section */}
        <div className="flex flex-col items-center bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-3xl shadow-2xl border-4 border-blue-400 p-12 hover:scale-105 transition-transform duration-300 w-[350px]">
          <span className="mb-4 px-4 py-1 rounded-full bg-blue-600 text-white font-bold shadow-lg text-lg">
            Realograma
          </span>
          <ImageUploadBox title="Subir realograma" onImageChange={setRealogramaFile} />
          <button
            onClick={handleRealograma}
            className="mt-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-4 text-xl font-extrabold shadow-xl hover:from-blue-800 hover:to-blue-600 hover:scale-110 transition-all border-2 border-blue-700"
          >
            Enviar <br /> Realograma
          </button>
        </div>
        {/* Producto Section */}
        <div className="flex flex-col items-center bg-gradient-to-br from-green-100 via-white to-green-200 rounded-3xl shadow-2xl border-4 border-green-400 p-12 hover:scale-105 transition-transform duration-300 w-[350px]">
          <span className="mb-4 px-4 py-1 rounded-full bg-green-600 text-white font-bold shadow-lg text-lg">
            Producto
          </span>
          <ImageUploadBox title="Subir producto" onImageChange={setProductoFile} />
          <button
            onClick={handleProducto}
            className="mt-8 rounded-full bg-gradient-to-r from-green-600 to-green-400 text-white px-10 py-4 text-xl font-extrabold shadow-xl hover:from-green-800 hover:to-green-600 hover:scale-110 transition-all border-2 border-green-700"
          >
            Enviar <br />Producto
          </button>
          {productoBase64 && (
            <img
              src={productoBase64}
              alt="Resultado producto"
              className="mt-4 max-w-xs rounded shadow"
            />
          )}
          {productoData && (
            <div className="mt-4 text-lg bg-white rounded p-4 shadow">
              <div><b>Clase:</b> {productoData.clase}</div>
              <div><b>Fila:</b> {productoData.fila}</div>
              
            </div>
          )}
        </div>
      </div>
    </section>
  );
}