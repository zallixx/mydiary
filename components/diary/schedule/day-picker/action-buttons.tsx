import { Button } from '@/components/ui/button';
import { Download, Plus, Settings } from 'lucide-react';
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
        });
    }
    else {
        toast.error("Расписание пустое!");
    }
}

export default function ActionButtons({dateString} : {dateString: string}) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDownload(dateString)}>
                <Download className="h-4 w-4" />
            </Button>
            <Button className="bg-[#0a3af5] hover:bg-[#0a3af5]/90">
                <Plus className="h-4 w-4 mr-2 text-white" />
                Создать
            </Button>
        </div>
    );
};