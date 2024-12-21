import React from 'react';
import {TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function DrawerTabsList({ indicatorRef, tabsListRef }: { indicatorRef: React.RefObject<HTMLDivElement>; tabsListRef: React.RefObject<HTMLDivElement> }) {
    return (
        <TabsList className="grid w-full grid-cols-2 relative" ref={tabsListRef}>
            <TabsTrigger value="lesson" data-value="lesson">Урок</TabsTrigger>
            <TabsTrigger value="homework" data-value="homework">Задания</TabsTrigger>
            <div
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-white transition-transform duration-75 ease-out"
                style={{
                    width: '50%',
                }}
            />
        </TabsList>
    );
}