import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a nuestro Sistema de Gestión Inmobiliaria
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Explora nuestra selección de propiedades y encuentra tu hogar ideal
        </p>
        <Link
          href="/properties"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Ver Propiedades Disponibles
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <div className="text-center p-6">
          <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
            <Image
              src="/search.svg"
              alt="Búsqueda"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Búsqueda Fácil</h2>
          <p className="text-gray-600">
            Encuentra la propiedad perfecta con nuestras herramientas de búsqueda.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
            <Image
              src="/house.svg"
              alt="Propiedades"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Amplia Selección</h2>
          <p className="text-gray-600">
            Descubre una gran variedad de propiedades disponibles.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
            <Image
              src="/support.svg"
              alt="Soporte"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Soporte 24/7</h2>
          <p className="text-gray-600">
            Estamos aquí para ayudarte en cada paso del proceso.
          </p>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Sistema de Gestión Inmobiliaria',
  description: 'Encuentra tu propiedad ideal con nuestro sistema de gestión inmobiliaria',
};
