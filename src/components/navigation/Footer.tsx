'use client'

export default function Footer() {
  return (
    <footer className="w-full h-24 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} PropManager. Todos los derechos reservados.
        </p>
        
        <div className="flex items-center gap-4">
          <a 
            href="/terms" 
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Términos y Condiciones
          </a>
          <a 
            href="/privacy" 
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  )
}