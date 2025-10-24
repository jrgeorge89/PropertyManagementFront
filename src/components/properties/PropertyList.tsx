import { memo } from 'react';
import { PropertyListItem } from '@/domain/models/property';
import { PropertyCardView } from '@/components/property/PropertyCardView';
import { PropertyListDto } from '@/domain/types';

interface PropertyListProps {
  properties: PropertyListItem[];
}

function PropertyListComponent({ properties }: PropertyListProps) {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <p className="text-gray-600">No hay propiedades disponibles en este momento.</p>
      </div>
    );
  }

  // Convertir PropertyListItem a PropertyListDto
  const mappedProperties: PropertyListDto[] = properties.map(property => ({
    id: property.idProperty,
    name: property.name || 'Propiedad sin nombre',
    address: property.address || 'Dirección no disponible',
    price: property.price || 0,
    images: property.imageUrl ? [{ file: property.imageUrl }] : [],
    type: 'Residencial', // Valor por defecto
    zone: property.ownerName || 'Zona no especificada',
    city: 'Ciudad', // Valor por defecto
    yearBuilt: new Date().getFullYear() // Valor por defecto
  }));

  return (
    <section 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-label="Lista de propiedades"
    >
      {mappedProperties.map((property) => (
        <PropertyCardView
          key={property.id}
          data={property}
          className="h-full"
        />
      ))}
    </section>
  );
}

// Memorizamos el componente para evitar re-renders innecesarios
const PropertyList = memo(PropertyListComponent);

// Nombre explícito para DevTools
PropertyList.displayName = 'PropertyList';

export default PropertyList;