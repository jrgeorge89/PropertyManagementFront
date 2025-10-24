'use client';

import React from 'react';

interface LoadingSpinnerProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className = '', 
  style,
  size = 'md' 
}) => {
  return (
    <div 
      className={`flex items-center justify-center p-4 ${className}`}
      style={style}
    >
      <div 
        className={`
          animate-spin 
          rounded-full 
          border-b-2 
          border-primary
          ${sizeClasses[size]}
        `}
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

LoadingSpinner.displayName = 'LoadingSpinner';