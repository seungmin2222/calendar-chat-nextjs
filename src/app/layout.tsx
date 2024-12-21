import { MSWComponent } from '@/app/MSWComponent';
import { Providers } from '@/providers';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Calendar Booking and Chat Platform',
  description: 'Book appointments and stay connected through real-time chat.',
};

interface RootLayoutProps {
  children: React.ReactNode;
  chat: React.ReactNode;
}

export default function RootLayout({ children, chat }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <main className="relative h-screen w-screen">
            <MSWComponent>{children}</MSWComponent>
            {chat}
          </main>
        </Providers>
      </body>
    </html>
  );
}
