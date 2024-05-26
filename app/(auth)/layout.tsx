import React from 'react';

export default function AuthenticationLayout({
    children,
}: {
    readonly children: Readonly<React.ReactNode>;
}) {
    return (
        <div className="flex justify-items-center items-center justify-center h-screen">
            {children}
        </div>
    );
}