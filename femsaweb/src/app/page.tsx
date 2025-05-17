"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ImageUploadBox({ title, onImage }: { title: string; onImage?: (img: string) => void }) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
        if (onImage) onImage(ev.target?.result as string);
      };
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
          width={256}
          height={256}
        />
      )}
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [realograma, setRealograma] = useState<string | null>(null);

  const handleEnviar = () => {
    // Aquí podrías guardar el realograma en algún estado global o backend si lo necesitas
    router.push("/dashboard");
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 text-center">Dashboard de Imágenes</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start text-black">
        <ImageUploadBox title="Subir Planograma" />
        <ImageUploadBox title="Subir Realograma" onImage={setRealograma} />
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleEnviar}
          className="mt-4 rounded-full bg-[#e60026] text-white px-8 py-4 text-lg font-bold border-4 border-transparent hover:border-yellow-400 hover:bg-white hover:text-[#e60026] transition-all shadow-lg"
        >
          Enviar archivos
        </button>
      </div>
    </section>
  );
}