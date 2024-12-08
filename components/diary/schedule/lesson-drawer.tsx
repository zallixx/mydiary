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
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

interface homeworkProps {
    id: string;
    date: Date;
    groupId: string;
    scheduleItemId: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    completions: {
        isCompleted: boolean;
    }[];
}

interface specificAssignmentsProps {
    description: string;
    homeworkCompletion: {
        isCompleted: boolean;
    }[];
}

export default function LessonDrawer({ open, onOpenChange, item, date }: { open: boolean; onOpenChange: () => void; item: itemProps; date: Date }) {
    const [activeTab, setActiveTab] = React.useState('lesson');
    const [api, setApi] = React.useState<any>();
    const indicatorRef = React.useRef<HTMLDivElement>(null);
    const tabsListRef = React.useRef<HTMLDivElement>(null);

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        if (api) {
            api.scrollTo(value === "lesson" ? 0 : 1)
        }
    }

    const handleSlideChange = () => {
        if (api) {
            const newIndex = api.selectedScrollSnap()
            setActiveTab(newIndex === 0 ? "lesson" : "homework")
        }
    }

    const updateIndicatorPosition = (scrollProgress: number) => {
        if (indicatorRef.current && tabsListRef.current) {
            const tabsListWidth = tabsListRef.current.clientWidth
            const indicatorWidth = tabsListWidth / 2
            const maxScroll = tabsListWidth - indicatorWidth
            const scrollPosition = Math.max(0, Math.min(scrollProgress * maxScroll, maxScroll))
            indicatorRef.current.style.transform = `translateX(${scrollPosition}px)`
        }
    }

    const handleScroll = () => {
        if (api) {
            const scrollProgress = api.scrollProgress()
            updateIndicatorPosition(scrollProgress)
        }
    }

    React.useEffect(() => {
        if (api) {
            api.on("select", handleSlideChange)
            api.on("scroll", handleScroll)
            updateIndicatorPosition(0)
        }
    }, [api])

    const lessonComponents: { title: string; children: { sub_title?: string; svg?: React.ReactElement; description?: string; homeworkList?: homeworkProps[]; specificAssignments?: specificAssignmentsProps[]; }[] }[] = [
        {
            title: item.event_type === 'LESSON' ? "Об уроке:" : "О мероприятии:",
            children: [
                {
                    sub_title: "Тип мероприятия",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
                    description: item.event_type,
                },
                {
                    sub_title: "Дата и время проведения",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock mr-1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                    description: date.toISOString().split('T')[0] + ' ' + new Date(item.baseSchedule.date).getUTCHours().toString().padStart(2, '0') + ':' + new Date(item.baseSchedule.date).getUTCMinutes().toString().padStart(2, '0') + ' - ' + new Date(new Date(item.baseSchedule.date).getTime() + item.baseSchedule.duration * 60000).getUTCHours().toString().padStart(2, '0') + ':' + new Date(new Date(item.baseSchedule.date).getTime() + item.baseSchedule.duration * 60000).getUTCMinutes().toString().padStart(2, '0'),
                },
                {
                    sub_title: "Место проведения",
                    svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mr-1"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>,
                    description: item.place,
                },
            ],
        },
        {
            title: "Преподаватель:",
            children: [
                {
                    description: item.baseSchedule.teacher.name,
                },
            ],
        },
        {
            title: "Домашние задания:",
            children: [
                {
                    homeworkList: item.homework,
                },
            ]
        },
        {
            title: "Личные задания:",
            children: [
                {
                    specificAssignments: item.specificAssignment,
                },
            ]
        },
    ];

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <Tabs defaultValue="lesson" value={activeTab} onValueChange={handleTabChange}>
                <DrawerContent className="h-full">
                    <DrawerHeader className="bg-[#7851f1] b-0">
                        <DrawerTitle className="flex items-center justify-center relative mt-3">
                            <ChevronLeft className="text-white absolute left-0 ml-2 cursor-pointer" onClick={onOpenChange}/>
                            <span className="text-white">Урок</span>
                        </DrawerTitle>
                        <DrawerDescription className="text-white flex flex-col items-center justify-center w-full">
                            <span>
                                {validateDate(date) + ' ' + getLessonTime(item.baseSchedule.date, item.baseSchedule.duration)}
                            </span>
                            <span className="mt-2 text-3xl font-semibold">
                                {item.baseSchedule.subject.name}
                            </span>
                            <span className="p-[16px] mt-2 w-96 mb-8 rounded-[16px] bg-white items-start justify-items-start content-start flex flex-col text-black">
                                <span className="text-gray-500">Тема</span>
                                <span>{item.topic + '12313131'}</span>
                            </span>
                            <TabsList className="grid w-full grid-cols-2 relative" ref={tabsListRef}>
                                <TabsTrigger value="lesson" data-value="lesson">Урок</TabsTrigger>
                                <TabsTrigger value="homework" data-value="homework">Задание</TabsTrigger>
                                <div
                                    ref={indicatorRef}
                                    className="absolute bottom-0 h-0.5 bg-white transition-transform duration-75 ease-out"
                                    style={{
                                        width: '50%',
                                    }}
                                />
                            </TabsList>
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="h-full">
                        <Carousel
                            setApi={setApi}
                            className="w-full"
                            opts={{
                                align: "start",
                                containScroll: "trimSnaps",
                            }}
                        >
                            <CarouselContent>
                                <CarouselItem className="basis-full">
                                    <div className="space-y-3.5">
                                        {lessonComponents.map((component, index) => {
                                            if (component.title === "Домашние задания:" || component.title === "Личные задания:") {
                                                return null;
                                            }
                                            return (
                                                <div className="p-[24px] w-auto rounded-[16px] bg-white items-start justify-items-start content-start flex flex-col text-[#87879b]" key={index}>
                                                    <span className="font-semibold text-lg text-black">{component.title}</span>
                                                    {component.children.map((child, childIndex) => (
                                                        <div key={childIndex} className={`text-base w-full ${component.title === 'Преподаватель:' || component.title === 'Домашние задания:' || component.title === 'Личные задания:' ? '' : 'pl-1'} flex flex-col`}>
                                                            <span className="flex flex-row items-center">
                                                                {child.svg}
                                                                {child.sub_title}
                                                            </span>
                                                            <span className={`flex flex-row items-center text-black ${component.title === 'Преподаватель:' ? '' : 'pl-6'}`}>
                                                                {child.description}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="basis-full">
                                    <ScrollArea className="h-[calc(100vh-300px)] overflow-y-auto">
                                        <div className="space-y-3.5">
                                            {lessonComponents.map((component, index) => {
                                                if (component.title !== "Домашние задания:" && component.title !== "Личные задания:") {
                                                    return null;
                                                }
                                                return (
                                                    <div className="p-[24px] w-auto rounded-[16px] bg-white items-start justify-items-start content-start flex flex-col text-[#87879b]" key={index}>
                                                        <span className="font-semibold text-lg text-black">{component.title}</span>
                                                        {component.children.map((child, childIndex) => (
                                                            <div key={childIndex} className={`text-base w-full ${component.title === 'Преподаватель:' || component.title === 'Домашние задания:' || component.title === 'Личные задания:' ? '' : 'pl-1'} flex flex-col`}>
                                                                {child.homeworkList && child.homeworkList.map((homework, homeworkIndex) => (
                                                                    <div key={homeworkIndex} className="flex flex-col items-start">
                                                                    <span className="flex flex-row items-center text-black">
                                                                        {homework.description}
                                                                    </span>
                                                                        <span className={`w-full mt-[16px] mb-2 h-[48px] text-black p-[16px] rounded-[16px] flex items-center cursor-pointer ${homework.completions[0]?.isCompleted ? 'bg-[#e8f7ea]' : 'bg-[#f4f4f8]'}`}>
                                                                        <Checkbox className={`h-6 w-6 mr-3 ${homework.completions[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`} checked={homework.completions[0]?.isCompleted}/>{homework.completions[0]?.isCompleted ? 'Задания выполнены' : 'Задания не выполнены'}</span>
                                                                    </div>
                                                                ))}
                                                                {child.specificAssignments && child.specificAssignments.map((assignment, assignmentIndex) => (
                                                                    <div key={assignmentIndex} className="flex flex-col items-start">
                                                                    <span className="flex flex-row items-center text-black">
                                                                        {assignment.description}
                                                                    </span>
                                                                        <span className={`w-full mt-[16px] h-[48px] p-[16px] rounded-[16px] flex items-center text-black cursor-pointer ${assignment.homeworkCompletion[0]?.isCompleted ? 'bg-[#e8f7ea]' : 'bg-[#f4f4f8]'}`}>
                                                                        <Checkbox className={`h-6 w-6 mr-3 ${assignment.homeworkCompletion[0]?.isCompleted ? 'bg-green-600 border-0 text-white' : 'text-[#ededf2]'}`} checked={assignment.homeworkCompletion[0]?.isCompleted}/>{assignment.homeworkCompletion[0]?.isCompleted ? 'Задания выполнены' : 'Задания не выполнены'}
                                                                    </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </ScrollArea>
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </DrawerFooter>
                </DrawerContent>
            </Tabs>
        </Drawer>
    );
};