"use client";
import { useState } from "react";
import Image from "next/image";

function ImageUploadBox({ title }: { title: string }) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 flex flex-col items-center w-full max-w-md ">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {image && (
        <Image
          src={image}
          alt={`Vista previa de ${title}`}
          className="max-h-64 rounded border"
        />
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <section >
      <h2 className="text-2xl font-bold mb-8 text-center ">Dashboard de Imágenes</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start text-black">
        <ImageUploadBox title="Subir Planograma" />
        <ImageUploadBox title="Subir Realograma" />
      </div>
    </section>
  );
}