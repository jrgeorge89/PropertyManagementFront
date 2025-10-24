// Tipos para el almacenamiento
type StorageType = 'local' | 'session'

interface StorageValue<T = unknown> {
  value: T
  timestamp: number
  expiry?: number // Tiempo de expiración en milisegundos
}

// Función para obtener el storage correcto
const getStorage = (type: StorageType): Storage => {
  if (typeof window === 'undefined') {
    return {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
      clear: () => null,
      length: 0,
      key: () => null
    }
  }
  return type === 'local' ? window.localStorage : window.sessionStorage
}

// Funciones para manejo de storage
export const storageService = {
  set: <T>(key: string, value: T, type: StorageType = 'local', expiry?: number) => {
    try {
      const storage = getStorage(type)
      const item: StorageValue<T> = {
        value,
        timestamp: Date.now(),
        expiry
      }
      storage.setItem(key, JSON.stringify(item))
      return true
    } catch (error) {
      console.error('Error setting storage:', error)
      return false
    }
  },

  get: <T>(key: string, type: StorageType = 'local'): T | null => {
    try {
      const storage = getStorage(type)
      const item = storage.getItem(key)
      if (!item) return null

      const { value, timestamp, expiry }: StorageValue<T> = JSON.parse(item)

      // Verificar expiración si existe
      if (expiry && Date.now() - timestamp > expiry) {
        storage.removeItem(key)
        return null
      }

      return value
    } catch (error) {
      console.error('Error getting storage:', error)
      return null
    }
  },

  remove: (key: string, type: StorageType = 'local') => {
    try {
      const storage = getStorage(type)
      storage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing storage:', error)
      return false
    }
  },

  clear: (type: StorageType = 'local') => {
    try {
      const storage = getStorage(type)
      storage.clear()
      return true
    } catch (error) {
      console.error('Error clearing storage:', error)
      return false
    }
  }
}