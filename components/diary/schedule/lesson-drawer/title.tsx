import { ChevronLeft } from 'lucide-react';
import * as React from 'react';
import { DrawerClose, DrawerTitle } from '@/components/ui/drawer';

export default function LessonDrawerTitle() {
    return (
        <DrawerTitle className="flex items-center justify-center relative mt-3">
            <DrawerClose asChild>
                <ChevronLeft className="absolute left-0 ml-2 cursor-pointer h-6 w-6 text-[#2c2c18]" />
            </DrawerClose>
            <span className="text-[#2c2c18]">Урок</span>
        </DrawerTitle>
    );
}