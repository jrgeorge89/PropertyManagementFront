import { renderHook } from '@testing-library/react-hooks'
import { act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProperties } from '../useProperties'
import { server } from '@/test/mocks/server'
import { rest } from 'msw'
import React from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5171'

const mockProperties = [
  {
    idProperty: '1',
    name: 'Casa de prueba',
    address: 'Calle Test 123',
    price: 100000,
    type: 'Casa',
    images: ['test-image.jpg']
  }
]

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0
      }
    }
  })

  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    )
  }
}

describe('useProperties', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('should fetch properties and update state', async () => {
    server.use(
      rest.get(`${API_BASE_URL}/Properties`, (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProperties))
      })
    )

    const { result, waitFor } = renderHook(() => useProperties(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.properties).toEqual(mockProperties)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })

  it('should update filters correctly', () => {
    const { result } = renderHook(() => useProperties(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.onFilterChange({ MinPrice: 100000, MaxPrice: 200000 })
    })

    expect(result.current.filters).toMatchObject({
      MinPrice: 100000,
      MaxPrice: 200000,
      PageNumber: 1
    })
  })

  it('should update search fields and reset page number', () => {
    const { result } = renderHook(() => useProperties(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.onNameChange('test name')
    })

    expect(result.current.nameSearch).toBe('test name')
    expect(result.current.filters.PageNumber).toBe(1)

    act(() => {
      result.current.onAddressChange('test address')
    })

    expect(result.current.addressSearch).toBe('test address')
    expect(result.current.filters.PageNumber).toBe(1)
  })

  it('should reset all filters and search fields', () => {
    const { result } = renderHook(() => useProperties(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.onNameChange('test name')
      result.current.onAddressChange('test address')
      result.current.onFilterChange({
        MinPrice: 100000,
        MaxPrice: 200000
      })
    })

    act(() => {
      result.current.onResetFilters()
    })

    expect(result.current.nameSearch).toBe('')
    expect(result.current.addressSearch).toBe('')
    expect(result.current.filters).toEqual({
      PageNumber: 1,
      PageSize: 10
    })
  })

  it('should handle API errors', async () => {
    server.use(
      rest.get(`${API_BASE_URL}/Properties`, (_req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { result, waitFor } = renderHook(() => useProperties(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.properties).toEqual([])
    })
  })
})