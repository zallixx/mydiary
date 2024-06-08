import React from 'react';
import MainHeader from '@/components/header/main-header';
import CurrentProfile from "@/lib/current-profile";

export default async function BaseLayout({
    children,
}: {
    readonly children: Readonly<React.ReactNode>;
}) {
    const profile = await CurrentProfile();

    return (
        <div className="flex justify-items-center items-center justify-center h-screen">
            <MainHeader profile={profile}/>
            {children}
        </div>
    );
}