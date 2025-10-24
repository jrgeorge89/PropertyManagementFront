import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit'
import { propertiesReducer } from './slices/propertiesSlice'
import { storageService } from '@/lib/storage'

// Definición de estado inicial y tipos
interface UserState {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  token?: string
}

interface PreferencesState {
  theme: 'light' | 'dark'
  language: string
  notifications: {
    email: boolean
    push: boolean
    [key: string]: boolean
  }
}

export interface RootState {
  properties: ReturnType<typeof propertiesReducer>
  user: UserState | null
  preferences: PreferencesState
}

// Estado inicial
const initialState: Partial<RootState> = {
  preferences: {
    theme: 'light',
    language: 'es',
    notifications: {
      email: true,
      push: true
    }
  }
}

// Middleware para sincronizar con localStorage
const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action)
  const state = store.getState() as RootState

  // Guardar preferencias en localStorage
  if (state.preferences) {
    storageService.set('preferences', state.preferences, 'local')
  }
  
  // Guardar datos de usuario en sessionStorage
  if (state.user) {
    storageService.set('user', state.user, 'session')
  }

  return result
}

// Cargar estado inicial desde storage
const loadInitialState = (): Partial<RootState> => {
  if (typeof window === 'undefined') {
    return initialState
  }

  return {
    ...initialState,
    preferences: storageService.get('preferences', 'local') ?? initialState.preferences,
    user: storageService.get('user', 'session')
  }
}

const rootReducer = combineReducers({
  properties: propertiesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadInitialState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
})

export type AppDispatch = typeof store.dispatch