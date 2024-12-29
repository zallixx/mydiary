'use client';

import MainLinks from '@/components/footer/main-links';
import * as React from 'react';

export default function MobileFooter() {
    const [width, setWidth] = React.useState(0);
    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    })

    return (
        <>
            {width < 1400 && (
                <footer className="fixed bottom-0 flex h-16 w-full items-center bg-white dark:bg-[#17171a]">
                    <MainLinks/>
                </footer>
            )}
        </>
    );
};