import React from 'react';

export default function ProfileLayout({
	children,
}: {
	readonly children: Readonly<React.ReactNode>;
}) {
    return (
        <div className="flex justify-center">
            {children}
        </div>
    );
}
