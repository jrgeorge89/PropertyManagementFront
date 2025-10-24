import { useQuery } from '@tanstack/react-query';
import { getPropertyById } from '@/infrastructure/api/propertyService';
import { Property } from '@/domain/models/property';

export const usePropertyDetail = (id: string) => {
  return useQuery<Property, Error>({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};