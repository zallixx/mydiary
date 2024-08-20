import React from 'react';

export default async function DiaryLayout({
	children,
}: {
	readonly children: Readonly<React.ReactNode>;

}) {
	return (
		<div>
			{children}
		</div>
	);
}
