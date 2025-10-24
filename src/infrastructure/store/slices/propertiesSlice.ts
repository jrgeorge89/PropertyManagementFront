import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PropertyListItem, PropertyFilters } from '@/domain/models/property'
import type { RootState } from '../index'

interface PropertiesState {
  items: PropertyListItem[]
  loading: boolean
  error: string | null
  filters: PropertyFilters
}

const initialState: PropertiesState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    PageNumber: 1,
    PageSize: 10,
    Name: '',
    Address: '',
    MinPrice: undefined,
    MaxPrice: undefined
  }
}

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<PropertyListItem[]>) => {
      state.items = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<PropertyFilters>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
        PageNumber: action.payload.PageNumber || state.filters.PageNumber
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    }
  }
})

// Actions
export const {
  setProperties,
  setLoading,
  setError,
  setFilters,
  resetFilters
} = propertiesSlice.actions

// Selectors
export const selectProperties = (state: RootState) => state.properties.items
export const selectLoading = (state: RootState) => state.properties.loading
export const selectError = (state: RootState) => state.properties.error
export const selectFilters = (state: RootState) => state.properties.filters

export default propertiesSlice.reducer