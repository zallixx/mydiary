import { Button } from '@/components/ui/button';
import { CirclePlus, Download, Settings } from 'lucide-react';
import * as React from 'react';
import { getFromIndexedDB } from '@/lib/indexedDB';
import { toast } from 'sonner';
import { itemProps } from '@/components/diary/schedule/interfaces';
import { getLessonTime } from '@/components/diary/schedule/functions';

async function prepareSchedule(schedule: itemProps[], dateString: string) {
    const stringSchedule = 'Расписание на ' + dateString + ':\n\n' + schedule.map(item => {
        const schedule = item.baseSchedule;
        const subjectName = schedule.subject.name;
        const lessonDate = getLessonTime(schedule.date, schedule.duration);
        const place = item.place;
        const room = schedule.room;
        const topic = item.topic;
        const teacher = schedule.teacher.name;
        const homework = item.homework.map(homework => homework.description).join(", ") || "Нет";
        const specificAssignments = item.specificAssignment.join(", ") || "Нет";

        return `
            ${subjectName}  ${lessonDate}:
            Проходит в ${place}. Помещение - ${room}.
            Преподаватель - ${teacher}.
            Тема: ${topic}.
            Домашнее задание: ${homework}
            Личные домашние задания: ${specificAssignments}`.trim(); // Обрезаем пробелы(с концов) дабы расписание выглядело в виде списка(название урока и потом через таб идут данные о уроке)
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
            success: () => {
                return `Расписание загружено!`;
            },
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