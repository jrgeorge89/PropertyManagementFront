interface LoadingSkeletonProps {
  count?: number;
  variant?: 'list' | 'detail';
}

export default function LoadingSkeleton({ count = 3, variant = 'list' }: LoadingSkeletonProps) {
  if (variant === 'detail') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
          {/* Hero image skeleton */}
          <div className="h-96 w-full bg-gray-200" />

          <div className="p-6">
            {/* Title skeleton */}
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* Property details skeleton */}
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>

              <div>
                {/* Owner details skeleton */}
                <div className="flex items-start space-x-4">
                  <div className="h-24 w-24 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Image gallery skeleton */}
            <div className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          {/* Imagen */}
          <div className="h-48 bg-gray-200" />
          
          {/* Contenido */}
          <div className="p-4 space-y-3">
            {/* Título */}
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            
            {/* Precio */}
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            
            {/* Detalles */}
            <div className="flex gap-4 mt-2">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
            
            {/* Dirección */}
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}