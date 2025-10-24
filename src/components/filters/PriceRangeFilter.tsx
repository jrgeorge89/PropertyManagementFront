import { ChangeEvent } from 'react';

export interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onPriceChange: (min: number | undefined, max: number | undefined) => void;
  isLoading?: boolean;
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onPriceChange,
  isLoading
}: PriceRangeFilterProps) {
  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    onPriceChange(value, maxPrice);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    onPriceChange(minPrice, value);
  };

  return (
    <div className="flex flex-col">
      <span className="mb-2 text-sm font-medium text-gray-700">
        Rango de Precio
      </span>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="precio-minimo" className="sr-only">
            Precio mínimo
          </label>
          <input
            id="precio-minimo"
            type="number"
            value={minPrice || ''}
            onChange={handleMinChange}
            placeholder="Precio mínimo"
            disabled={isLoading}
            min={0}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="precio-maximo" className="sr-only">
            Precio máximo
          </label>
          <input
            id="precio-maximo"
            type="number"
            value={maxPrice || ''}
            onChange={handleMaxChange}
            placeholder="Precio máximo"
            disabled={isLoading}
            min={0}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}