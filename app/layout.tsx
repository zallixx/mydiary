import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

const nextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'MyDiary',
	description: '',
	manifest: '/manifest.json',
};

export default async function RootLayout({
	children,
}: {
	readonly children: Readonly<React.ReactNode>;
}) {
	return (
		<TooltipProvider>
			<html lang='en'>
				<body className={nextFont.className}>
					{children}
					<Toaster richColors expand />
				</body>
			</html>
		</TooltipProvider>
	);
}
