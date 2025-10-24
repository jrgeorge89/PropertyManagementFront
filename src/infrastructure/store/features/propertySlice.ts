import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { PropertyService } from '@/application/services/propertyService'
import { Property, PropertyListItem } from '@/domain/models/property'

interface PropertyState {
  properties: PropertyListItem[]
  selectedProperty: Property | null
  featuredProperties: PropertyListItem[]
  loading: boolean
  error: string | null
}

const initialState: PropertyState = {
  properties: [],
  selectedProperty: null,
  featuredProperties: [],
  loading: false,
  error: null,
}

// Thunks
export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async () => {
    return await PropertyService.getProperties()
  }
)

export const fetchPropertyById = createAsyncThunk(
  'property/fetchPropertyById',
  async (id: string) => {
    return await PropertyService.getPropertyById(id)
  }
)

export const fetchFeaturedProperties = createAsyncThunk(
  'property/fetchFeaturedProperties',
  async () => {
    return await PropertyService.getFeaturedProperties()
  }
)

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    clearSelectedProperty: (state) => {
      state.selectedProperty = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProperties.fulfilled, (state, action: PayloadAction<PropertyListItem[]>) => {
        state.loading = false
        state.properties = action.payload
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar las propiedades'
      })
      // Fetch Property By Id
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPropertyById.fulfilled, (state, action: PayloadAction<Property>) => {
        state.loading = false
        state.selectedProperty = action.payload
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar la propiedad'
      })
      // Fetch Featured Properties
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action: PayloadAction<PropertyListItem[]>) => {
        state.loading = false
        state.featuredProperties = action.payload
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar las propiedades destacadas'
      })
  },
})

export const { clearSelectedProperty, clearError } = propertySlice.actions

export default propertySlice.reducer