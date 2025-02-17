import React from 'react';

export default function JournalLayout({
	children,
}: {
	readonly children: Readonly<React.ReactNode>;
}) {
    return (
        <div className="flex justify-center w-full">
            {children}
        </div>
    );
}
