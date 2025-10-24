import propertiesReducer, {
  setProperties,
  setLoading,
  setError,
  setFilters,
  resetFilters
} from '../propertiesSlice'
import type { PropertyListItem } from '@/domain/models/property'

describe('propertiesSlice', () => {
  const mockInitialState = {
    items: [] as PropertyListItem[],
    loading: false,
    error: null as string | null,
    filters: {
      PageNumber: 1,
      PageSize: 10,
      Name: '',
      Address: '',
      MinPrice: undefined as number | undefined,
      MaxPrice: undefined as number | undefined
    }
  }

  const mockProperties: PropertyListItem[] = [
    {
      idProperty: '1',
      name: 'Casa de prueba',
      address: 'Calle Test 123',
      price: 100000,
      type: 'Casa',
      images: ['test-image.jpg']
    }
  ]

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(propertiesReducer(undefined, { type: 'unknown' })).toEqual(mockInitialState)
    })

    it('should handle setProperties', () => {
      const nextState = propertiesReducer(mockInitialState, setProperties(mockProperties))
      expect(nextState.items).toEqual(mockProperties)
    })

    it('should handle setLoading', () => {
      const nextState = propertiesReducer(mockInitialState, setLoading(true))
      expect(nextState.loading).toBe(true)
    })

    it('should handle setError', () => {
      const errorMessage = 'Test error'
      const nextState = propertiesReducer(mockInitialState, setError(errorMessage))
      expect(nextState.error).toBe(errorMessage)
    })

    it('should handle setFilters', () => {
      const newFilters = {
        MinPrice: 100000,
        MaxPrice: 200000,
        Name: 'test'
      }
      const nextState = propertiesReducer(mockInitialState, setFilters(newFilters))

      expect(nextState.filters).toEqual({
        ...mockInitialState.filters,
        ...newFilters,
      })
    })

    it('should handle resetFilters', () => {
      const stateWithFilters = {
        ...mockInitialState,
        filters: {
          PageNumber: 2,
          PageSize: 20,
          Name: 'test',
          MinPrice: 100000,
          MaxPrice: 200000,
          Address: 'test address'
        }
      }
      const nextState = propertiesReducer(stateWithFilters, resetFilters())
      expect(nextState.filters).toEqual(mockInitialState.filters)
    })
  })

  describe('actions', () => {
    it('should create setProperties action', () => {
      const expectedAction = {
        type: setProperties.type,
        payload: mockProperties
      }
      expect(setProperties(mockProperties)).toEqual(expectedAction)
    })

    it('should create setLoading action', () => {
      const expectedAction = {
        type: setLoading.type,
        payload: true
      }
      expect(setLoading(true)).toEqual(expectedAction)
    })

    it('should create setError action', () => {
      const errorMessage = 'Test error'
      const expectedAction = {
        type: setError.type,
        payload: errorMessage
      }
      expect(setError(errorMessage)).toEqual(expectedAction)
    })

    it('should create setFilters action', () => {
      const newFilters = {
        MinPrice: 100000,
        MaxPrice: 200000
      }
      const expectedAction = {
        type: setFilters.type,
        payload: newFilters
      }
      expect(setFilters(newFilters)).toEqual(expectedAction)
    })

    it('should create resetFilters action', () => {
      const expectedAction = {
        type: resetFilters.type
      }
      expect(resetFilters()).toEqual(expectedAction)
    })
  })

  describe('state changes', () => {
    it('should handle multiple actions in sequence', () => {
      let state = propertiesReducer(undefined, { type: 'unknown' })
      
      state = propertiesReducer(state, setLoading(true))
      expect(state.loading).toBe(true)
      
      state = propertiesReducer(state, setProperties(mockProperties))
      expect(state.items).toEqual(mockProperties)
      
      state = propertiesReducer(state, setLoading(false))
      expect(state.loading).toBe(false)
      
      state = propertiesReducer(state, setFilters({ MinPrice: 100000 }))
      expect(state.filters.MinPrice).toBe(100000)
      
      state = propertiesReducer(state, resetFilters())
      expect(state.filters).toEqual(mockInitialState.filters)
    })
  })
})