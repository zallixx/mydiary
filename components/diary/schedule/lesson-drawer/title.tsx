import { ChevronLeft } from 'lucide-react';
import * as React from 'react';
import { DrawerTitle } from '@/components/ui/drawer';

export default function LessonDrawerTitle({ onOpenChange }: { onOpenChange: () => void }) {
    return (
        <DrawerTitle className="flex items-center justify-center relative mt-3">
            <ChevronLeft className="text-white absolute left-0 ml-2 cursor-pointer" onClick={onOpenChange}/>
            <span className="text-white">Урок</span>
        </DrawerTitle>
    );
}