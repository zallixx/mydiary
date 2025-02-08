import React from 'react';
import MainHeader from '@/components/header/main-header';
import { CurrentProfile } from '@/lib/auth/current-profile';
import { redirect } from 'next/navigation';
import MobileFooter from '@/components/footer/mobile-footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';

export default async function BaseLayout({
	children,
}: {
	readonly children: Readonly<React.ReactNode>;

}) {
	const { activated, profile } = await CurrentProfile();

	if (!activated || !profile) {
		return redirect('/auth');
	}

	if (!profile.groups || profile.groups.length === 0) {
		return redirect('/');
	}

	return (
		<div>
			<SidebarProvider className="overflow-hidden">
				<AppSidebar profile={profile} />
				<MainHeader profile={profile} />
				{children}
				<MobileFooter />
			</SidebarProvider>
		</div>
	);
}
