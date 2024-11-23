import { itemProps } from '@/components/diary/schedule/lesson-item';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { ChevronLeft } from 'lucide-react';
import * as React from 'react';
import { getLessonTime, validateDate } from '@/components/diary/schedule/functions';
import useSwipe from '@/components/useSwipe';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';


export default function LessonDrawer({ open, onOpenChange, item, params }: { open: boolean; onOpenChange: () => void; item: itemProps; params: { diaryDay: string; } }) {
    const swipeHandlers = useSwipe({ onSwipedLeft: () => setActiveTab('lesson'), onSwipedRight: () => setActiveTab('homework') });
    const [activeTab, setActiveTab] = React.useState('lesson');

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <Tabs defaultValue="lesson" value={activeTab} onValueChange={value => setActiveTab(value)}>
                <DrawerContent className="h-full">
                    <DrawerHeader className="bg-[#7851f1] b-0">
                        <DrawerTitle className="flex items-center justify-center relative mt-3">
                            <ChevronLeft className="text-white absolute left-0 ml-2 cursor-pointer" onClick={onOpenChange}/>
                            <span className="text-white">Урок</span>
                        </DrawerTitle>
                        <DrawerDescription className="text-white flex flex-col items-center justify-center w-full">
                            <span>
                                {validateDate(params.diaryDay) + ' ' + getLessonTime(item.baseSchedule.date, item.baseSchedule.duration)}
                            </span>
                            <span className="mt-2 text-3xl font-semibold">
                                {item.baseSchedule.subject.name}
                            </span>
                            <span className="p-[16px] mt-2 w-96 mb-8 rounded-[16px] bg-white items-start justify-items-start content-start flex flex-col text-black">
                                <span className="text-gray-500">Тема</span>
                                <span>{item.topic + '12313131'}</span>
                            </span>
                            <TabsList>
                                <TabsTrigger value="lesson" data-value="lesson">Урок</TabsTrigger>
                                <TabsTrigger value="homework" data-value="homework">Задание</TabsTrigger>
                            </TabsList>
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter {...swipeHandlers} className="h-full">
                        <TabsContent value="lesson">Make changes to your account here.</TabsContent>
                        <TabsContent value="homework">Change your password here.</TabsContent>
                    </DrawerFooter>
                </DrawerContent>
            </Tabs>
        </Drawer>
    );
};