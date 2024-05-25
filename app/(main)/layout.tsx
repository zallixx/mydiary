import React from 'react';

export default function BaseLayout({
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