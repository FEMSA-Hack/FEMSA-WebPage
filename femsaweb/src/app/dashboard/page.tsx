"use client";
import Image from "next/image";

// Simulación de datos de productos
const productos = [
  {
    nombre: "CocaCola",
    almacen: 120,
    vendidos: 80,
    rotacion: "Alta",
    img: "/images/cocacola.png", // Cambia por la ruta real si tienes imágenes
  },
  {
    nombre: "Fanta",
    almacen: 60,
    vendidos: 40,
    rotacion: "Media",
    img: "/images/fanta.png",
  },
  {
    nombre: "Sprite",
    almacen: 90,
    vendidos: 55,
    rotacion: "Baja",
    img: "/images/sprite.png",
  },
];

export default function Dashboard() {
  return (
    <section className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col gap-6">
        {productos.map((prod) => (
          <div key={prod.nombre} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-gray-200">
            <div className="flex items-center gap-4">
              <Image src={prod.img} alt={prod.nombre} width={48} height={48} className="rounded" />
              <h3 className="text-xl font-bold">{prod.nombre}</h3>
            </div>
            <div className="mt-2">
              <p className="text-gray-700">En almacenamiento: <span className="font-semibold">{prod.almacen}</span></p>
              <p className="text-gray-700">Vendidos: <span className="font-semibold">{prod.vendidos}</span></p>
              <p className="text-gray-700">Rotación: <span className="font-semibold">{prod.rotacion}</span></p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold mb-4">Realograma</h4>
        <div className="w-80 h-80 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
          Sin imagen de realograma
        </div>
      </div>
    </section>
  );
}