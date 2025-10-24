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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{property.name}</h1>
        <div className="flex items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{property.address}</span>
        </div>
      </div>

      {/* Galería de imágenes con diseño mejorado */}
      <div className="bg-black rounded-xl overflow-hidden mb-12">
        <div className="relative aspect-[16/9]">
          {property.images && property.images.length > 0 ? (
            property.images.map((image, index) => (
              <Image
                key={image.idPropertyImage}
                src={image.file}
                alt={`${property.name} - Imagen ${index + 1}`}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                priority={index === 0}
              />
            ))
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sin imágenes disponibles</span>
            </div>
          )}

          {/* Controles de la galería mejorados */}
          {property.images && property.images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={prevImage}
                className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 transition-colors shadow-lg"
                aria-label="Imagen anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 transition-colors shadow-lg"
                aria-label="Siguiente imagen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Indicador de imágenes */}
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid de información */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detalles principales */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detalles de la Propiedad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Precio</h3>
                  <p className="text-xl font-bold text-blue-600">{formatPrice(property.price)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
                  <p className="text-gray-900">{property.type || 'No especificado'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Año de construcción</h3>
                  <p className="text-gray-900">{property.yearBuilt}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Zona</h3>
                  <p className="text-gray-900">{property.zone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ciudad</h3>
                  <p className="text-gray-900">{property.city}</p>
                </div>
                {property.codeInternal && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Código interno</h3>
                    <p className="text-gray-900">{property.codeInternal}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ubicación</h2>
            <div className="aspect-[16/9] bg-gray-100 rounded-lg">
              {/* Aquí podrías agregar un mapa si lo tienes disponible */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Mapa no disponible
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar - Información del propietario */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Información del Propietario</h2>
            <div className="flex items-start space-x-4 mb-6">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={property.owner.photo}
                  alt={property.owner.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{property.owner.name}</h3>
                <p className="text-sm text-gray-500">{property.owner.address}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => window.location.href = `mailto:contact@example.com?subject=Consulta sobre propiedad ${property.idProperty}`}
              >
                Contactar Propietario
              </button>
              
              <button 
                className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Agendar Visita
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}