// @ts-nocheck

import { itemProps } from '@/types/schedule';
import { getLessonTime } from '@/utils/schedule';
import { getFromIndexedDB } from '@/utils/scheduleDB';
import { toast } from 'sonner';

async function prepareSchedule(schedule: itemProps[], dateString: string) {
    const stringSchedule = 'Расписание на ' + dateString + ':\n\n' + schedule.map(item => {
        const subjectName = item.subject?.name || item.name;
        const lessonDate = getLessonTime(item.startTime, item.endTime);
        const room = item.room;
        const topic = item.topic;
        const teacher = item.teacher.name + " " + item.teacher.surname;
        const homework = item.homework.map(homework => homework.description).join(", ") || "Нет";

        return `
            ${subjectName}  ${lessonDate}:
            Место проведения - ${room}.
            Преподаватель - ${teacher}.
            Тема: ${topic}.
            Домашнее задание: ${homework}`.trim(); // Обрезаем пробелы(с концов) дабы расписание выглядело в виде списка(название урока и потом через таб идут данные о уроке)
    }).join("\n");
    const blob = new Blob([stringSchedule], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Расписание на ${dateString}.docx`;
    link.click();
    URL.revokeObjectURL(url);
}

export async function handleDownload(dateString: string) {
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