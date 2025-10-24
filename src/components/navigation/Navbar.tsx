'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              href="/" 
              className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900"
            >
              <span className="font-bold text-xl">Inmobiliaria</span>
            </Link>
          </div>

          <div className="flex space-x-8">
            <Link 
              href="/" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                pathname === '/' 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="/properties" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                pathname.startsWith('/properties') 
                  ? 'border-blue-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Propiedades
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}