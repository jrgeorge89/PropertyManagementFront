'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface PropertyFiltersType {
  Name?: string;
  Address?: string;
  minPrice?: number;
  maxPrice?: number;
  PageNumber?: number;
  PageSize?: number;
}

interface PropertyFiltersProps {
  initialFilters: PropertyFiltersType;
}

export default function PropertyFilters({ initialFilters }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    name: initialFilters.Name || '',
    address: initialFilters.Address || '',
    minPrice: initialFilters.minPrice?.toString() || '',
    maxPrice: initialFilters.maxPrice?.toString() || '',
  });

  const debouncedFilters = useDebounce(filters, 500);

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      
      // Eliminar parámetros vacíos existentes
      Array.from(newSearchParams.keys()).forEach(key => {
        if (!newSearchParams.get(key)) {
          newSearchParams.delete(key);
        }
      });

      // Actualizar con nuevos parámetros
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const queryString = createQueryString({
      name: debouncedFilters.name,
      address: debouncedFilters.address,
      minPrice: debouncedFilters.minPrice,
      maxPrice: debouncedFilters.maxPrice,
    });

    const url = queryString ? `${pathname}?${queryString}` : pathname;
    window.history.pushState({}, '', url);
    router.refresh();
  }, [debouncedFilters, pathname, router, createQueryString]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
    });
    window.history.pushState({}, '', pathname);
    router.refresh();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="Buscar por nombre..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={filters.address}
            onChange={handleInputChange}
            placeholder="Buscar por dirección..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Precio Mínimo
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            placeholder="Precio mínimo..."
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Precio Máximo
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            placeholder="Precio máximo..."
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
}