// @ts-nocheck
import { ChevronLeft } from 'lucide-react';
import { DrawerClose, DrawerTitle } from '@/components/ui/drawer';
import { itemProps } from '@/types/schedule';
import { defineEventType } from '@/utils/schedule';

export default function LessonDrawerTitle({ item } : { item: itemProps }) {
    return (
        <DrawerTitle className="flex items-center justify-center relative mt-3">
            <DrawerClose asChild>
                <ChevronLeft className="absolute left-0 ml-2 cursor-pointer h-6 w-6 text-[#2c2c18]" />
            </DrawerClose>
            <span className="text-[#2c2c18]">{defineEventType(item.type)}</span>
        </DrawerTitle>
    );
}