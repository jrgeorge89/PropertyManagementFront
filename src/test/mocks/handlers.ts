import { rest } from 'msw'
import { setupServer } from 'msw/node'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5171'

const mockProperties = [
  {
    idProperty: '1',
    name: 'Casa de prueba',
    address: 'Calle Test 123',
    price: 100000,
    type: 'Casa',
    images: ['test-image.jpg'],
  },
  {
    idProperty: '2',
    name: 'Apartamento de prueba',
    address: 'Avenida Test 456',
    price: 80000,
    type: 'Apartamento',
    images: ['test-image-2.jpg'],
  },
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
    birthDate: '1980-01-01',
  },
  images: [
    { idPropertyImage: '1', file: 'test-image-1.jpg' },
    { idPropertyImage: '2', file: 'test-image-2.jpg' },
  ],
}

export const handlers = [
  rest.get(`${API_BASE_URL}/Properties`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProperties))
  }),

  rest.get(`${API_BASE_URL}/Properties/:id`, async (req, res, ctx) => {
    const { id } = req.params
    const response = { ...mockPropertyDetail, idProperty: id }
    return res(ctx.status(200), ctx.json(response))
  }),
]