import { PropertyListItem } from '@/domain/models/property';
import { PropertyCardView } from '@/components/property/PropertyCardView';
import { Pagination } from '@/components/ui/Pagination';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export interface PropertyListClientProps {
  properties: PropertyListItem[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function PropertyListClient({
  properties,
  currentPage,
  pageSize,
  onPageChange,
  isLoading
}: PropertyListClientProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No se encontraron propiedades con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {properties.map((property) => (
          <PropertyCardView
            key={property.idProperty}
            property={property}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={properties.length}
        onPageChange={onPageChange}
      />
    </div>
  );
}