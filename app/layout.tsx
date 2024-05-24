import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

const nextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyDiary",
  description: "",
};

export default function RootLayout({
    children,
}: {
    readonly children: Readonly<React.ReactNode>;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={nextFont.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
