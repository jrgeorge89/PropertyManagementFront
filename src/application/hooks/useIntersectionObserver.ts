import { useEffect, useRef, useState, MutableRefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  enabled?: boolean;
}

type IntersectionState = {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
};

type IntersectionResult<T> = [MutableRefObject<T | null>, boolean];

export function useIntersectionObserver<T extends Element>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  enabled = true,
}: UseIntersectionObserverProps = {}): IntersectionResult<T> {
  const [state, setState] = useState<IntersectionState>({ isIntersecting: false });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    // Limpiar observador anterior
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Si no está habilitado, no crear nuevo observador
    if (!enabled) {
      return;
    }

    // Crear nuevo observador
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setState({
          isIntersecting: entry.isIntersecting,
          entry,
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    // Observar el elemento si existe
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    // Limpiar al desmontar
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled, root, rootMargin, threshold]);

  return [targetRef, state.isIntersecting];
}

// Hook específico para carga infinita
interface UseInfiniteLoadingProps extends UseIntersectionObserverProps {
  onLoadMore: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
}

export function useInfiniteLoading<T extends Element = HTMLDivElement>({
  onLoadMore,
  isLoading = false,
  hasNextPage = false,
  ...options
}: UseInfiniteLoadingProps): MutableRefObject<T | null> {
  const [ref, isIntersecting] = useIntersectionObserver<T>({
    ...options,
    enabled: !isLoading && hasNextPage,
  });

  useEffect(() => {
    if (isIntersecting && !isLoading && hasNextPage) {
      onLoadMore();
    }
  }, [isIntersecting, isLoading, hasNextPage, onLoadMore]);

  return ref;
}