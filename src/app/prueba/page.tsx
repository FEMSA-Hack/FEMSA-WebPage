'use client'

import { useEffect, useState } from 'react'

type ObjectData = {
  class: string
  x_center: number
  y_center: number
  width: number
  height: number
}

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageSize, setImageSize] = useState<{ naturalWidth: number, naturalHeight: number, clientWidth: number, clientHeight: number }>({ naturalWidth: 0, naturalHeight: 0, clientWidth: 0, clientHeight: 0 })
  const [objects, setObjects] = useState<ObjectData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/upload')
      const data = await res.json()
      setImageUrl(data.imageUrl)
      setObjects(data.objects)
    }

    fetchData()
  }, [])

  const imageRef = (img: HTMLImageElement | null) => {
    if (img) {
      const { naturalWidth, naturalHeight, clientWidth, clientHeight } = img
      setImageSize({ naturalWidth, naturalHeight, clientWidth, clientHeight })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative">
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt="Detected Image"
              ref={imageRef}
              className="max-w-full h-auto"
            />
            {objects.map((obj, index) => {
              // Escalar las coordenadas al tamaño visible de la imagen
              const scaleX = imageSize.clientWidth / imageSize.naturalWidth
              const scaleY = imageSize.clientHeight / imageSize.naturalHeight

              const left = (obj.x_center - obj.width / 2) * scaleX
              const top = (obj.y_center - obj.height / 2) * scaleY
              const width = obj.width * scaleX
              const height = obj.height * scaleY

              return (
                <div
                  key={index}
                  className="absolute border-2 border-red-500"
                  style={{
                    left,
                    top,
                    width,
                    height,
                    pointerEvents: 'none'
                  }}
                >
                  <span className="text-white text-xs bg-black bg-opacity-60 p-1 absolute top-0 left-0">
                    {obj.class}
                  </span>
                </div>
              )
            })}
          </>
        )}
      </div>
    </main>
  )
}
