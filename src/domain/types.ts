// Interfaces para las propiedades
export interface PropertyListDto {
  id: string;
  name: string;
  address: string;
  price: number;
  images: { file: string }[];
  type: string;
  zone: string;
  city: string;
  yearBuilt: number;
}

export interface PropertyFilters {
  page: number;
  limit: number;
  search?: string;
  priceMin?: number;
  priceMax?: number;
  propertyType?: string[];
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PropertySearchParams extends URLSearchParams {
  page?: number
  limit?: number
  search?: string
  priceMin?: number
  priceMax?: number
  propertyType?: string[]
}

// Tipos para el cache y storage
export interface CacheConfig {
  enabled: boolean
  duration: number
  key: string
}

export interface StorageConfig {
  key: string
  type: 'local' | 'session'
  expiry?: number
}

// Tipos para respuestas de la API
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ErrorResponse {
  message: string
  code: string
  details?: Record<string, unknown>
}