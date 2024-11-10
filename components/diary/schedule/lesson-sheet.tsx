import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { itemProps } from '@/components/diary/schedule/lesson-item';
import { validateDate } from '@/components/diary/schedule/functions';

export default function LessonSheet({ open, onOpenChange, item, params }: { open: boolean; onOpenChange: () => void; item: itemProps; params: { diaryDay: string; } }) {


    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="lg:w-[35%] max-lg:w-[50%]">
                <SheetHeader>
                    <SheetTitle className="flex flex-col items-start justify-items-start content-start w-full">
                        <span className="font-semibold">
                            {item.baseSchedule.subject.name}
                        </span>
                        <span className="flex text-gray-600">
                            {validateDate(params.diaryDay) + ' · ' +  item.baseSchedule.date.getUTCHours().toString().padStart(2, '0') + ':' + item.baseSchedule.date.getUTCMinutes().toString().padStart(2, '0') + ' - ' + new Date(item.baseSchedule.date.getTime() + item.baseSchedule.duration * 60000).getUTCHours().toString().padStart(2, '0') + ':' + new Date(item.baseSchedule.date.getTime() + item.baseSchedule.duration * 60000).getUTCMinutes().toString().padStart(2, '0')}
                        </span>
                    </SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                1
            </SheetContent>
        </Sheet>
    );
}