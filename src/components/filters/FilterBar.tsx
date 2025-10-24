import { PropertyFilters } from '@/domain/models/property';
import { SearchFilter } from './SearchFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { FilterActions } from './FilterActions';

export interface FilterBarProps {
  nameSearch: string;
  addressSearch: string;
  onNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onFilterChange: (filters: Partial<PropertyFilters>) => void;
  onResetFilters: () => void;
  filters?: Partial<PropertyFilters>;
  isLoading?: boolean;
}

export function FilterBar({
  nameSearch,
  addressSearch,
  onNameChange,
  onAddressChange,
  onFilterChange,
  onResetFilters,
  filters = {},
  isLoading
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SearchFilter
          value={nameSearch}
          onChange={onNameChange}
          placeholder="Buscar por nombre..."
          label="Nombre"
          isLoading={isLoading}
        />
        
        <SearchFilter
          value={addressSearch}
          onChange={onAddressChange}
          placeholder="Buscar por dirección..."
          label="Dirección"
          isLoading={isLoading}
        />
        
        <PriceRangeFilter
          minPrice={filters.MinPrice}
          maxPrice={filters.MaxPrice}
          onPriceChange={(min, max) => 
            onFilterChange({ MinPrice: min, MaxPrice: max })
          }
          isLoading={isLoading}
        />
      </div>

      <FilterActions
        onReset={onResetFilters}
        isLoading={isLoading}
      />
    </div>
  );
}