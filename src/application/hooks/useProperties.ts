import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { getProperties } from '@/infrastructure/api/propertyService';
import { PropertyFilters, PropertyListItem } from '@/domain/models/property';
import { useDebounce } from '@/application/hooks/useDebounce';

export const useProperties = () => {
  const [filters, setFilters] = useState<PropertyFilters>({
    PageNumber: 1,
    PageSize: 10
  });

  const [nameSearch, setNameSearch] = useState('');
  const [addressSearch, setAddressSearch] = useState('');

  const debouncedName = useDebounce(nameSearch, 500);
  const debouncedAddress = useDebounce(addressSearch, 500);

  const { data: properties, isLoading, isError, error, isFetching } = useQuery<PropertyListItem[], Error>({
    queryKey: ['properties', filters, debouncedName, debouncedAddress],
    queryFn: () => getProperties({
      ...filters,
      Name: debouncedName,
      Address: debouncedAddress
    }),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });

  const onNameChange = useCallback((value: string) => {
    setNameSearch(value);
    setFilters(prev => ({ ...prev, PageNumber: 1 }));
  }, []);

  const onAddressChange = useCallback((value: string) => {
    setAddressSearch(value);
    setFilters(prev => ({ ...prev, PageNumber: 1 }));
  }, []);

  const onFilterChange = useCallback((newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, PageNumber: 1 }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const onResetFilters = useCallback(() => {
    setNameSearch('');
    setAddressSearch('');
    setFilters({
      PageNumber: 1,
      PageSize: 10
    });
  }, []);

  return {
    properties: properties || [],
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
  };
};