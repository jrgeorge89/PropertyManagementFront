import { ChangeEvent } from 'react';

export interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  isLoading?: boolean;
}

export function SearchFilter({
  value,
  onChange,
  placeholder,
  label,
  isLoading
}: SearchFilterProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={`search-${label.toLowerCase()}`}
        className="mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={`search-${label.toLowerCase()}`}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={isLoading}
        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}
