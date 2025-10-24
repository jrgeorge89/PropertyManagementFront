import { Suspense } from 'react';
import { PropertiesPageClient } from './properties-page-client';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Propiedades Disponibles',
  description: 'Explora nuestra selección de propiedades inmobiliarias disponibles',
  openGraph: {
    title: 'Propiedades Disponibles',
    description: 'Explora nuestra selección de propiedades inmobiliarias disponibles',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function PropertiesPage() {
  return (
    <Suspense fallback={<LoadingSkeleton variant="list" count={3} />}>
      <PropertiesPageClient />
    </Suspense>
  );
}