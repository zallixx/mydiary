// @ts-nocheck
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
} from '@/components/ui/drawer';
import * as React from 'react';
import {
    createLessonComponents,
    getLessonTime,
    validateDate
} from '@/utils/schedule';
import { Tabs } from '@/components/ui/tabs';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { itemProps } from '@/types/schedule';
import LessonDrawerTitle from '@/components/diary/schedule/lesson-drawer/title';
import LessonSheetAbsence from '@/components/diary/schedule/lesson-sheet/absence';
import LessonSheetAssignment from '@/components/diary/schedule/lesson-sheet/assignment';
import LessonSheetAssessment from '@/components/diary/schedule/lesson-sheet/assessment';
import LessonSheetHomework from '@/components/diary/schedule/lesson-sheet/homework';
import LessonDrawerTopic from '@/components/diary/schedule/lesson-drawer/topic';
import LessonSheetAttributes from '@/components/diary/schedule/lesson-sheet/attributes';
import DrawerItemTitle from '@/components/diary/schedule/lesson-drawer/item-title';
import DrawerTabsList from '@/components/diary/schedule/lesson-drawer/tabs-list';

export default function LessonDrawer({ open, onOpenChange, item, date }: { open: boolean; onOpenChange: () => void; item: itemProps; date: Date }) {
    const [activeTab, setActiveTab] = React.useState('lesson');
    const [api, setApi] = React.useState<any>();
    const indicatorRef = React.useRef<HTMLDivElement>(null);
    const tabsListRef = React.useRef<HTMLDivElement>(null);
    const lessonComponents = createLessonComponents(item);

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

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <Tabs defaultValue="lesson" value={activeTab} onValueChange={handleTabChange}>
                <DrawerContent className="h-full">
                    <DrawerHeader className="bg-[#aaad60] b-0">
                        <LessonDrawerTitle />
                        <DrawerDescription className="text-white flex flex-col items-center justify-center w-full">
                            <span className="text-[#2c2c18]">
                                {validateDate(date) + ' ' + getLessonTime(item.startTime, item.endTime)}
                            </span>
                            <LessonDrawerTopic item={item} />
                            <DrawerTabsList indicatorRef={indicatorRef} tabsListRef={tabsListRef} />
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
                                    <ScrollArea className="h-[calc(100vh-270px)]">
                                        <div className="space-y-2">
                                            {lessonComponents.map((component, index) => {
                                                if (component.title === "Домашние задания" || component.title === "Личные задания" ||
                                                    (component.title === "Результаты урока" && (!component.children[0].assessment || component.children[0].assessment.length === 0)) ||
                                                    (component.title === "Пропуск" && (!component.children[0].absence || component.children[0].absence.length === 0))
                                                ) {
                                                    return null
                                                }
                                                return (
                                                    <>
                                                        <DrawerItemTitle component={component} />
                                                        <div key={index} className="rounded-lg bg-white mr-4 ml-4 p-4 text-card-foreground">
                                                                <div className="space-y-3">
                                                                    {component.children.map((child, childIndex) => (
                                                                        <div key={childIndex} className="space-y-1">
                                                                            <div className="flex flex-col">
                                                                                <LessonSheetAttributes child={child} isTeacher={component.title === 'Преподаватель'} /> {/* TODO: объеденить в общую папку */}
                                                                                <LessonSheetAssessment child={child} /> {/* TODO: объеденить в общую папку */}
                                                                                <LessonSheetAbsence child={child} /> {/* TODO: объеденить в общую папку */}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </ScrollArea>
                                </CarouselItem>
                                <CarouselItem className="basis-full">
                                    <ScrollArea className="h-[calc(100vh-300px)] overflow-y-auto">
                                        <div className="space-y-2">
                                            {lessonComponents.map((component, index) => {
                                                if (
                                                    (component.title !== "Домашние задания" && component.title !== "Личные задания") ||
                                                    (component.title === "Домашние задания" && (!component.children[0].homeworkList || component.children[0].homeworkList.length === 0)) ||
                                                    (component.title === "Личные задания" && (!component.children[0].specificAssignments || component.children[0].specificAssignments.length === 0))
                                                ) {
                                                    return null;
                                                }
                                                return (
                                                    <>
                                                        <DrawerItemTitle component={component} />
                                                        <div key={index} className="rounded-lg bg-white mr-4 ml-4 p-4 text-card-foreground">
                                                            <div className="space-y-3">
                                                                {component.children.map((child, childIndex) => (
                                                                    <div key={childIndex} className="space-y-1">
                                                                        <div className="flex flex-col">
                                                                            <LessonSheetHomework child={child} date={date} /> {/* TODO: объеденить в общую папку */}
                                                                            <LessonSheetAssignment child={child} date={date} /> {/* TODO: объеденить в общую папку */}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </>
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