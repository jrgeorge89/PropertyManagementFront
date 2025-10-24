import { getProperties, getPropertyById } from '../propertyService'
import { server } from '@/test/mocks/server'
import { rest } from 'msw'

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

const mockPropertyDetail = {
  idProperty: '1',
  name: 'Propiedad detallada',
  address: 'Dirección detallada',
  price: 150000,
  codeInternal: 'TEST-123',
  yearBuilt: 2020,
  type: 'Casa',
  zone: 'Norte',
  city: 'Ciudad Test',
  owner: {
    idOwner: '1',
    name: 'Juan Prueba',
    address: 'Dirección del dueño',
    photo: 'owner-photo.jpg',
    birthDate: '1980-01-01'
  },
  images: [
    { idPropertyImage: '1', file: 'test-image-1.jpg' },
    { idPropertyImage: '2', file: 'test-image-2.jpg' }
  ]
}

describe('propertyService', () => {
  describe('getProperties', () => {
    it('should fetch properties successfully', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/Properties`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(mockProperties))
        })
      )

      const properties = await getProperties()
      expect(properties).toHaveLength(1)
      expect(properties[0]).toEqual(expect.objectContaining({
        idProperty: '1',
        name: 'Casa de prueba',
        address: 'Calle Test 123'
      }))
    })

    it('should handle query parameters correctly', async () => {
      const filters = {
        Name: 'test',
        MinPrice: 100000,
        MaxPrice: 200000,
        PageNumber: 1,
        PageSize: 10
      }

      server.use(
        rest.get(`${API_BASE_URL}/Properties`, (req, res, ctx) => {
          const url = new URL(req.url)
          expect(url.searchParams.get('Name')).toBe(filters.Name)
          expect(url.searchParams.get('MinPrice')).toBe(filters.MinPrice.toString())
          expect(url.searchParams.get('MaxPrice')).toBe(filters.MaxPrice.toString())
          return res(ctx.status(200), ctx.json([]))
        })
      )

      await getProperties(filters)
    })

    it('should handle API errors correctly', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/Properties`, (_req, res, ctx) => {
          return res(ctx.status(500))
        })
      )

      await expect(getProperties()).rejects.toThrow('Error fetching properties')
    })
  })

  describe('getPropertyById', () => {
    it('should fetch a single property successfully', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/Properties/:id`, (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(mockPropertyDetail))
        })
      )

      const property = await getPropertyById('1')
      expect(property).toEqual(mockPropertyDetail)
    })

    it('should handle non-existent property', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/Properties/:id`, (_req, res, ctx) => {
          return res(ctx.status(404))
        })
      )

      await expect(getPropertyById('999')).rejects.toThrow('Error fetching property details')
    })

    it('should handle network errors', async () => {
      server.use(
        rest.get(`${API_BASE_URL}/Properties/:id`, (_req, res, ctx) => {
          return res(ctx.status(500))
        })
      )

      await expect(getPropertyById('1')).rejects.toThrow()
    })
  })
})