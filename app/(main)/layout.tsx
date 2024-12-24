import React from 'react';
import MainHeader from '@/components/header/main-header';
import { CurrentProfile } from '@/lib/auth/current-profile';
import { redirect } from 'next/navigation';
import MobileFooter from '@/components/footer/mobile-footer';

export default async function BaseLayout({
	children,
}: {
	readonly children: Readonly<React.ReactNode>;

}) {
	const { activated, profile } = await CurrentProfile();

	if (!activated || !profile) {
		return redirect('/sign-in');
	}

	if (!profile.groups || profile.groups.length === 0) {
		return redirect('/');
	}

	return (
		<div>
			<MainHeader profile={profile} />
			{children}
			<MobileFooter />
		</div>
	);
}
