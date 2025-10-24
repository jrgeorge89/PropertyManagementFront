'use client';

import { PropertyApiError } from '@/domain/models/error';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  let errorMessage = 'Ha ocurrido un error inesperado';
  let errorDetails = '';

  if (error instanceof PropertyApiError) {
    switch (error.statusCode) {
      case 404:
        errorMessage = 'Propiedad no encontrada';
        errorDetails = 'La propiedad que buscas no existe o ha sido eliminada';
        break;
      case 400:
        errorMessage = 'Solicitud inválida';
        errorDetails = error.message;
        break;
      case 500:
        errorMessage = 'Error del servidor';
        errorDetails = 'Ha ocurrido un error en el servidor. Por favor intenta más tarde.';
        break;
      default:
        errorMessage = error.message;
        errorDetails = error.details || '';
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            {errorMessage}
          </h1>
          {errorDetails && (
            <p className="text-gray-600 mb-6">
              {errorDetails}
            </p>
          )}
          <div className="flex justify-center gap-4">
            <button
              onClick={reset}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Intentar de nuevo
            </button>
            <a
              href="/properties"
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Volver al listado
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}