'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/domain/models/property';

interface PropertyViewClientProps {
  property: Property;
}

export default function PropertyViewClient({ property }: PropertyViewClientProps) {
  const mainImage = property.images && property.images.length > 0 
    ? property.images[0].file 
    : null;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-96 w-full">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={property.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-6">
          <Link
            href="/properties"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Volver al listado
          </Link>
          <h1 className="text-3xl font-bold mt-2">{property.name}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Detalles de la Propiedad</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Dirección:</span> {property.address}</p>
              <p><span className="font-semibold">Precio:</span> ${property.price.toLocaleString('es-CO')}</p>
              <p><span className="font-semibold">Código Interno:</span> {property.codeInternal}</p>
              <p><span className="font-semibold">Año Construcción:</span> {property.yearBuilt}</p>
              <p><span className="font-semibold">Tipo:</span> {property.type || 'No especificado'}</p>
              <p><span className="font-semibold">Zona:</span> {property.zone}</p>
              <p><span className="font-semibold">Ciudad:</span> {property.city}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Información del Propietario</h2>
            <div className="flex items-start space-x-4">
              <div className="relative h-24 w-24 rounded-full overflow-hidden">
                {property.owner?.photo ? (
                  <Image
                    src={property.owner.photo}
                    alt={property.owner.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sin foto</span>
                  </div>
                )}
              </div>
              <div>
                <p><span className="font-semibold">Nombre:</span> {property.owner?.name || 'No disponible'}</p>
                <p><span className="font-semibold">Dirección:</span> {property.owner?.address || 'No disponible'}</p>
              </div>
            </div>
          </div>
        </div>

        {property.images && property.images.length > 1 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Galería de Imágenes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {property.images.slice(1).map((image) => (
                <div key={image.idPropertyImage} className="relative h-48">
                  <Image
                    src={image.file}
                    alt={`${property.name} - Imagen adicional`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}