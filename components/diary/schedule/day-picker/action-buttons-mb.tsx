import { Button } from '@/components/ui/button';
import { CirclePlus, Download, Settings } from 'lucide-react';
import * as React from 'react';
import { getFromIndexedDB } from '@/utils/scheduleDB';
import { toast } from 'sonner';
import { itemProps } from '@/types/schedule';
import { getLessonTime } from '@/utils/schedule';

async function prepareSchedule(schedule: itemProps[], dateString: string) {
    const stringSchedule = 'Расписание на ' + dateString + ':\n\n' + schedule.map(item => {
        const subjectName = item.subject.name;
        const lessonDate = getLessonTime(item.startTime, item.endTime);
        const room = item.room;
        const topic = item.topic;
        const teacher = item.teacher.name + " " + item.teacher.surname;
        const homework = item.homework.map(homework => homework.description).join(", ") || "Нет";

        return `
            ${subjectName}  ${lessonDate}:
            Помещение - ${room}.
            Преподаватель - ${teacher}.
            Тема: ${topic}.
            Домашнее задание: ${homework}`.trim(); // Обрезаем пробелы(с концов) дабы расписание выглядело в виде списка(название урока и потом через таб идут данные о уроке)
    }).join("\n");

    const blob = new Blob([stringSchedule], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Расписание на ${dateString}.txt`;
    link.click();
    URL.revokeObjectURL(url);
}

async function handleDownload(dateString: string) {
    const schedule = await getFromIndexedDB(dateString);
    if (schedule.schedule.length > 0) {
        const promise = prepareSchedule(schedule.schedule, dateString);
        toast.promise(promise, {
            loading: 'Загружаем расписание...',
            success: `Расписание загружено!`,
            error: 'Что-то пошло не так...',
            position: 'top-center',
            duration: 1000,
        });
    }
    else {
        toast.error("Расписание пустое!", {duration: 1000, position: 'top-center'});
    }
}

export default function ActionButtonsMb({dateString} : {dateString: string}) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="bg-white">
                <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-white" onClick={() => handleDownload(dateString)}>
                <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-white">
                <CirclePlus className="h-4 w-4" />
            </Button>
        </div>
    );
}