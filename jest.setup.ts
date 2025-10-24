import '@testing-library/jest-dom'
import { server } from './src/test/mocks/server'

// Set up request interception for MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Configure fetch polyfills
import 'isomorphic-fetch'
import { Response, Headers, Request } from 'node-fetch'

if (!global.fetch) {
  global.fetch = require('node-fetch')
}

Object.defineProperty(global, 'Response', {
  writable: true,
  value: Response
})

Object.defineProperty(global, 'Headers', {
  writable: true,
  value: Headers
})

Object.defineProperty(global, 'Request', {
  writable: true,
  value: Request
})

// Mock de matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock de IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

// Configuración de MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Silenciar warnings de consola durante los tests
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
  console.warn = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})