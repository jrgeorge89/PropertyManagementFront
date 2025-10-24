import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debouncing de valores
 * @param value - Valor a aplicar debounce
 * @param delay - Tiempo de espera en milisegundos (default: 500ms)
 * @returns Valor con debounce aplicado
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configurar el timer para actualizar el valor después del delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timer anterior si el valor cambia antes del delay
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook personalizado para debouncing de funciones
 * @param fn - Función a aplicar debounce
 * @param delay - Tiempo de espera en milisegundos (default: 500ms)
 * @returns Función con debounce aplicado
 */
export function useDebouncedCallback<T extends (...args: never[]) => void>(
  fn: T,
  delay: number = 500
): T {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  // Crear función con debounce
  const debouncedFn = (...args: Parameters<T>) => {
    // Cancelar la ejecución anterior
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Configurar nueva ejecución
    const newTimeoutId = setTimeout(() => {
      fn(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  };

  // Limpiar el timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedFn as T;
}