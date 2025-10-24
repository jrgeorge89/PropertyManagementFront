export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5171';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export function cn(...classes: (string | undefined | null | false | 0)[]) {
  return classes.filter(Boolean).join(' ');
}