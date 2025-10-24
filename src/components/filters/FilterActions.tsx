export interface FilterActionsProps {
  onReset: () => void;
  isLoading?: boolean;
}

export function FilterActions({ onReset, isLoading }: FilterActionsProps) {
  return (
    <div className="flex justify-end mt-6">
      <button
        onClick={onReset}
        disabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        Limpiar Filtros
      </button>
    </div>
  );
}