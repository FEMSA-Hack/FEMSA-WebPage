'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  status: string
}

interface DataResponse {
  imageUrl: string
  products: Product[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DataResponse | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    // Simulación de respuesta del backend
    const mockData: DataResponse = {
      imageUrl: '/images/EstanteReal.jpg',
      products: [
        {
          id: 'prod-1',
          name: 'Coca-Cola',
          x: 120,
          y: 120,
          width: 100,
          height: 100,
          status: 'incorrecto'
        },
        {
          id: 'prod-2',
          name: 'Sabritas',
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          status: 'correcto'
        }
      ]
    }

    setData(mockData)
  }, [])

  // Ejemplo simple de estadística general (puedes personalizar)
  const generalStats = {
    totalProducts: data?.products.length || 0,
    incorrectProducts: data?.products.filter(p => p.status === 'incorrecto').length || 0,
    correctProducts: data?.products.filter(p => p.status === 'correcto').length || 0,
  }

  return (
    <div className="min-h-screen p-30  flex flex-col-reverse md:flex-row md:items-start md:justify-center gap-40">
      {/* IZQUIERDA - Estadísticas */}
      <div className="md:w-1/3 w-full flex flex-col gap-4">
        {/* Estadísticas generales */}
        <div className="bg-gray-100 p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-3">Estadísticas Generales</h2>
          <p>Total productos: {generalStats.totalProducts}</p>
          <p>Productos correctos: {generalStats.correctProducts}</p>
          <p>Productos incorrectos: {generalStats.incorrectProducts}</p>
        </div>

        {/* Estadísticas del producto seleccionado (si existe) */}
        {selectedProduct && (
          <div
            className={`p-4 rounded shadow ${
              selectedProduct.status === 'incorrecto'
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            <h2 className="text-lg font-semibold mb-2">Detalles del Producto</h2>
            <p><strong>Nombre:</strong> {selectedProduct.name}</p>
            <p><strong>Status:</strong> {selectedProduct.status}</p>
            {/* Puedes agregar más detalles aquí */}
            <button
              className={`mt-4 px-3 py-1 rounded ${
                selectedProduct.status === 'incorrecto'
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
              onClick={() => setSelectedProduct(null)}
            >
              Cerrar detalles
            </button>
          </div>
        )}  
      </div>

      {/* DERECHA - Imagen y rectángulos */}
      <div className="md:w-1/3 w-full relative">
        {data && (
          <>
            <Image
              src={data.imageUrl}
              alt="Imagen detección"
              width={500}
              height={500}
              className="w-full mx-auto md:mx-0"
            />
            {/* Contenedor para los rectángulos sobre la imagen */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {data.products.map((product) => (
                <div
                  key={product.id}
                  className="absolute border-2 cursor-pointer pointer-events-auto"
                  style={{
                    left: product.x,
                    top: product.y,
                    width: product.width,
                    height: product.height,
                    borderColor: product.status === 'incorrecto' ? 'red' : 'green'
                  }}
                  onClick={() => {
                    if (product.status === 'incorrecto') {
                      setSelectedProduct(product)
                    } else {
                      setSelectedProduct(product)
                    }
                  }}
                  title={product.name}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
