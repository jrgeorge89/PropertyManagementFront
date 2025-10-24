import { ReduxProvider } from '@/infrastructure/store/provider';
import { QueryProvider } from './QueryProvider';
import { metadata } from './metadata';
import './globals.css';
import { Inter } from 'next/font/google';

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
            {children}
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
