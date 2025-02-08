'use client';

import MainLinks from '@/components/footer/main-links';
import { useEffect, useState } from 'react';

export default function MobileFooter() {
    const [width, setWidth] = useState(0);
    useEffect(() => {
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
                <footer className="fixed bottom-0 left-0 flex right-0 border-t mx-auto h-16 w-full items-center bg-white">
                    <MainLinks/>
                </footer>
            )}
        </>
    );
};