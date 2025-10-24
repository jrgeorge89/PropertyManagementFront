'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Property } from '@/domain/models/property';
import { formatPrice } from '@/lib/utils';

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{property.name}</h1>
      
      {/* Galería de imágenes */}
      <div className="relative aspect-video w-full mb-8">
        <div className="relative h-[400px] w-full">
          {property.images && property.images.length > 0 ? (
            property.images.map((image, index) => (
              <Image
                key={image.idPropertyImage}
                src={image.file}
                alt={`${property.name} - Imagen ${index + 1}`}
                fill
                className={`object-cover rounded-lg transition-opacity duration-500 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                priority={index === 0}
              />
            ))
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-400">Sin imágenes disponibles</span>
            </div>
          )}
        </div>
        
        {/* Controles de la galería */}
        {property.images && property.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={prevImage}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Imagen anterior"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Siguiente imagen"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Detalles de la propiedad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Detalles de la Propiedad</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Dirección:</span> {property.address}</p>
              <p><span className="font-medium">Precio:</span> {formatPrice(property.price)}</p>
              <p><span className="font-medium">Año de construcción:</span> {property.yearBuilt}</p>
              <p><span className="font-medium">Zona:</span> {property.zone}</p>
              <p><span className="font-medium">Ciudad:</span> {property.city}</p>
              {property.type && (
                <p><span className="font-medium">Tipo:</span> {property.type}</p>
              )}
              {property.codeInternal && (
                <p><span className="font-medium">Código interno:</span> {property.codeInternal}</p>
              )}
            </div>
          </div>
        </div>

        {/* Información del propietario */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Información del Propietario</h2>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src={property.owner.photo}
                  alt={property.owner.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{property.owner.name}</p>
                <p className="text-gray-600 text-sm">{property.owner.address}</p>
              </div>
            </div>
            <button 
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => window.location.href = `mailto:contact@example.com?subject=Consulta sobre propiedad ${property.idProperty}`}
            >
              Contactar Propietario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}