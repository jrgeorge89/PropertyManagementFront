'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Property } from '@/domain/models/property'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  property: Property
}

export default function ImageGallery({ property }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Función para generar el placeholder blur
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stop-color="#f6f7f8" offset="0%"/>
          <stop stop-color="#edeef1" offset="50%"/>
          <stop stop-color="#f6f7f8" offset="100%"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
    </svg>
  `

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return (
    <div className="relative w-full">
      {/* Imagen Principal */}
      <div className="aspect-video w-full relative rounded-lg overflow-hidden">
        <Image
          src={property.images[selectedImageIndex]}
          alt={`${property.title} - Imagen ${selectedImageIndex + 1}`}
          fill
          className="object-cover"
          priority={selectedImageIndex === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          quality={90}
        />
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {property.images.map((image, index) => (
          <button
            key={image}
            onClick={() => setSelectedImageIndex(index)}
            className={cn(
              "relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden",
              index === selectedImageIndex ? "ring-2 ring-primary" : "opacity-70"
            )}
          >
            <Image
              src={image}
              alt={`Miniatura ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
              loading="lazy"
              quality={60}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(80, 80))}`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}