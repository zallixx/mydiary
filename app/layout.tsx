import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Мой дневник',
    description: '',
    icons: '/default_mai.svg',
    manifest: '/manifest.webmanifest',
};

export default async function RootLayout({
    children,
}: {
    readonly children: Readonly<React.ReactNode>;
}) {
    return (
        <TooltipProvider>
            <html lang='ru'>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    {children}
                    <Toaster richColors expand/>
                </body>
            </html>
        </TooltipProvider>
    );
}