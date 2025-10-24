'use client';

import React from 'react';
import { withLoadingAndError } from '../hoc/withLoadingAndError';
import { PropertyListDto } from '@/domain/types';
import { PropertyCardView } from './PropertyCardView';

interface PropertyCardContainerProps {
  data: PropertyListDto;
  className?: string;
}

const PropertyCardContainer: React.FC<PropertyCardContainerProps> = ({ 
  data,
  className 
}) => {
  return (
    <PropertyCardView
      data={data}
      className={className}
    />
  );
};

PropertyCardContainer.displayName = 'PropertyCardContainer';

// Aplicamos el HOC para manejar estados de loading y error
export const PropertyCardWithLoadingAndError = withLoadingAndError<PropertyListDto>(
  PropertyCardContainer
);

// Exportamos el componente sin el HOC para casos donde no se necesite
export default PropertyCardContainer;