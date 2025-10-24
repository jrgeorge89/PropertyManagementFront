'use client';

import { ComponentType, ReactElement } from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';

// Props base para los componentes UI
type BaseUIProps = {
  className?: string;
  style?: React.CSSProperties;
};

// Props que el HOC requiere
interface WithLoadingAndErrorProps<T> {
  loading?: boolean;
  error?: string | null;
  data: T | null;
}

// Props que el componente envuelto requiere
type WrappedComponentProps<T> = BaseUIProps & {
  data: T;
};

/**
 * HOC que maneja estados de carga y error
 * @param WrappedComponent - Componente a envolver
 * @returns Componente envuelto con manejo de loading y error
 */
export function withLoadingAndError<T>(
  WrappedComponent: ComponentType<WrappedComponentProps<T>>
) {
  // El componente resultante mantiene el displayName del original
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Componente envuelto que maneja loading y error
  function WithLoadingAndErrorComponent(
    props: WithLoadingAndErrorProps<T> & BaseUIProps
  ): ReactElement {
    const { loading = false, error = null, data, className = '', style } = props;

    if (loading) {
      return <LoadingSpinner className={className} style={style} />;
    }

    if (error) {
      return <ErrorMessage message={error} className={className} style={style} />;
    }

    if (!data) {
      return (
        <ErrorMessage 
          message="No hay datos disponibles" 
          className={className} 
          style={style}
          variant="info"
        />
      );
    }

    const componentProps: WrappedComponentProps<T> = {
      data,
      className,
      style
    };

    return <WrappedComponent {...componentProps} />;
  }

  WithLoadingAndErrorComponent.displayName = `withLoadingAndError(${displayName})`;

  return WithLoadingAndErrorComponent;
}