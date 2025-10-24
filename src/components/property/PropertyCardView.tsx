import Link from 'next/link';
import Image from 'next/image';
import { PropertyListItem } from '@/domain/models/property';
import { formatPrice } from '@/lib/utils';

export interface PropertyCardViewProps {
  property: PropertyListItem;
}

export function PropertyCardView({ property }: PropertyCardViewProps) {
  return (
    <Link 
      href={`/properties/${property.idProperty}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48">
        {property.images && property.images.length > 0 ? (
          <Image
            src={property.images[0]}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {property.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2 truncate">
          {property.address}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">
            {formatPrice(property.price)}
          </span>
          
          {property.type && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {property.type}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}