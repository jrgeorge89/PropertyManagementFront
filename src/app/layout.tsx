import { ReduxProvider } from '@/infrastructure/store/provider';
import { QueryProvider } from './QueryProvider';
import { metadata } from './metadata';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navigation/Navbar';

export { metadata };

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50" suppressHydrationWarning>
        <QueryProvider>
          <ReduxProvider>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
