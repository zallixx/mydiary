import React from 'react';

export default function AuthenticationLayout({
	children,
}: {
	readonly children: Readonly<React.ReactNode>;
}) {
	return (
		<div className='flex h-screen items-center justify-center justify-items-center'>
			{children}
		</div>
	);
}
