'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Property } from '@/domain/models/property';
import { formatPrice } from '@/lib/utils';

interface PropertyViewClientProps {
  property: Property;
}

export default function PropertyViewClient({ property }: PropertyViewClientProps) {
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
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-7xl mx-auto">
      {/* Header con botón de retorno */}
      <div className="py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-800">
        <Link
          href="/properties"
          className="text-white hover:text-blue-200 inline-flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al listado
        </Link>
        <h1 className="text-2xl font-bold text-white mt-1">{property.name}</h1>
      </div>

      {/* Galería de imágenes mejorada */}
      <div className="relative">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* Aspecto 16:9 */}
          {property.images && property.images.length > 0 ? (
            <>
              {property.images.map((image, index) => (
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
              ))}
              
              {/* Navegación de imágenes */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={prevImage}
                  className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Imagen anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Siguiente imagen"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Indicadores de imagen */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sin imágenes disponibles</span>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detalles de la propiedad */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalles de la Propiedad</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Precio</h3>
                    <p className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
                    <p className="text-gray-900">{property.address}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ciudad</h3>
                    <p className="text-gray-900">{property.city}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Año de construcción</h3>
                    <p className="text-gray-900">{property.yearBuilt}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
                    <p className="text-gray-900">{property.type || 'No especificado'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Zona</h3>
                    <p className="text-gray-900">{property.zone}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Galería de miniaturas */}
            {property.images && property.images.length > 1 && (
              <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Galería de Imágenes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {property.images.map((image, index) => (
                    <button
                      key={image.idPropertyImage}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={image.file}
                        alt={`${property.name} - Miniatura ${index + 1}`}
                        fill
                        className="object-cover hover:opacity-90 transition-opacity"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - Información del propietario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Propietario</h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  {property.owner?.photo ? (
                    <Image
                      src={property.owner.photo}
                      alt={property.owner.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No foto</span>
                    </div>
                  )}
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
    </div>
  );
}