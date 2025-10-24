import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import PropertyViewClient from '@/components/properties/PropertyViewClient';
import { getPropertyById, getProperties } from '@/infrastructure/api/propertyService';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: PageProps) {
  if (!params.id) {
    notFound();
  }

  try {
    const property = await getPropertyById(params.id);

    return (
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <PropertyViewClient property={property} />
        </Suspense>
      </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'NOT_FOUND') {
        notFound();
      }
      console.error('Error al cargar la propiedad:', error);
    }
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps) {
  if (!params.id) {
    return {
      title: 'Propiedad no encontrada',
      description: 'La propiedad que buscas no está disponible',
    };
  }

  try {
    const property = await getPropertyById(params.id);
    return {
      title: property.name,
      description: `${property.name} ubicada en ${property.address}, ${property.city}`,
      openGraph: {
        title: property.name,
        description: `${property.name} ubicada en ${property.address}, ${property.city}`,
        images: property.images.map(img => ({
          url: img.file,
        })),
      },
    };
  } catch (error) {
    return {
      title: 'Propiedad no encontrada',
      description: 'La propiedad que buscas no está disponible',
    };
  }
}

export async function generateStaticParams() {
  try {
    const properties = await getProperties();
    return properties.map((property) => ({
      id: property.idProperty,
    }));
  } catch (error) {
    console.error('Error generando parámetros estáticos:', error);
    return [];
  }
}