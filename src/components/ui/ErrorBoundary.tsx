'use client';

import { ReactNode, useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  children: ReactNode;
}

export default function ErrorBoundary({ error, reset, children }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('Error en la aplicación:', error);
  }, [error]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Ups! Algo salió mal
            </h2>
            <p className="text-gray-600 mb-6">
              {error.message || 'Ha ocurrido un error inesperado'}
            </p>
            <button
              onClick={reset}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}