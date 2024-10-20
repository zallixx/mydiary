import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ruRU } from '@clerk/localizations';
import {TooltipProvider} from "@/components/ui/tooltip";

const nextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'MyDiary',
	description: '',
};

export default function RootLayout({
	children,
}: {
	readonly children: Readonly<React.ReactNode>;
}) {
	return (
		<ClerkProvider localization={ruRU}>
			<TooltipProvider>
				<html lang='en'>
					<body className={nextFont.className}>
						<ThemeProvider
							attribute='class'
							defaultTheme='white'
						>
							{children}
							<Toaster richColors expand />
						</ThemeProvider>
					</body>
				</html>
			</TooltipProvider>
		</ClerkProvider>
	);
}
