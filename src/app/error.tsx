'use client';

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Lo sentimos, ha ocurrido un error
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message === 'fetch failed' 
            ? 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet o inténtalo más tarde.'
            : 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.'}
        </p>
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}