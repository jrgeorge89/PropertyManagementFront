'use client';

import { Suspense } from 'react';
import { PropertyListClient } from '@/components/properties/PropertyListClient';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { FilterBar } from '@/components/filters/FilterBar';
import { useProperties } from '@/application/hooks/useProperties';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export function PropertiesPageClient() {
  const {
    properties,
    isLoading,
    isError,
    error,
    isFetching,
    filters,
    nameSearch,
    addressSearch,
    onNameChange,
    onAddressChange,
    onFilterChange,
    onResetFilters,
    updateFilters
  } = useProperties();

  if (isError) {
    return (
      <div className="container mx-auto px-4">
        <ErrorMessage
          message={error?.message || 'Error al cargar las propiedades'}
          retry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Propiedades Disponibles</h1>
        <p className="text-gray-600 mt-2">
          Explora nuestra selección de propiedades inmobiliarias
        </p>
      </div>

      <FilterBar
        nameSearch={nameSearch}
        addressSearch={addressSearch}
        onNameChange={onNameChange}
        onAddressChange={onAddressChange}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        filters={filters}
        isLoading={isFetching}
      />

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSkeleton variant="list" count={3} />
        </div>
      ) : (
        <Suspense fallback={<LoadingSkeleton variant="list" count={3} />}>
          <PropertyListClient
            properties={properties}
            currentPage={filters.PageNumber || 1}
            pageSize={filters.PageSize || 10}
            onPageChange={(page: number) => updateFilters({ PageNumber: page })}
            isLoading={isFetching}
          />
        </Suspense>
      )}
    </main>
  );
}