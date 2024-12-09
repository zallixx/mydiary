import { Homework, studyResourcesType } from '@prisma/client';

const today = new Date();
const timezoneOffset = today.getTimezoneOffset()*60000;
const todayLocal = new Date(today.getTime() - timezoneOffset);
todayLocal.setUTCHours(0, 0, 0, 0);

const validateDate = (inputDate: Date): string | boolean => {
    const dayDifference = Math.round((inputDate.getTime() - todayLocal.getTime()) / (24 * 60 * 60 * 1000));

    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    switch (dayDifference) {
        case -2:
            return "Позавчера";
        case -1:
            return "Вчера";
        case 0:
            return "Сегодня";
        case 1:
            return "Завтра";
        case 2:
            return "Послезавтра";
        default:
            return days[inputDate.getUTCDay()] + ' ' + inputDate.toLocaleString("ru-RU", {month: "short", day: "numeric" });
    }
};

const setPropForItem = (item: string): string => {
    switch (item) {
        case 'UNAUTHORIZED':
            return 'text-[#dc143c]';
        case 'SICK':
            return 'text-[#15b1d4]';
        case 'Контрольная работа':
            return 'border border-[#dc143c]';
        default:
            return '';
    }
};

const setIndexForGrade = (item: string): string => {
    switch (item) {
        case 'Олимпиада':
            return '3';
        case 'Контрольная работа':
            return '2';
        default:
            return '';
    }
};

const currentTimeInItemRange = (itemDate: Date, duration: number) => {
    return todayLocal >= itemDate && todayLocal < new Date(itemDate.getTime() + duration * 60000);
};

const getLessonTime = (date: Date, duration: number) => {
    const itemDate = new Date(date);
    return itemDate.getUTCHours().toString().padStart(2, '0') + ':' + itemDate.getUTCMinutes().toString().padStart(2, '0') + ' - ' + new Date(itemDate.getTime() + duration * 60000).getUTCHours().toString().padStart(2, '0') + ':' + new Date(itemDate.getTime() + duration * 60000).getUTCMinutes().toString().padStart(2, '0');
};

const countHomeworkWithParam = (homeworkList: Homework[], param: string) => {
    return homeworkList.reduce((count: number, homework: Homework) => {
        switch (param) {
            case 'Test':
                // @ts-ignore
                return count + homework.attachments.filter(att => att.type === studyResourcesType.TEST).length;
            case 'Theory':
                // @ts-ignore
                return count + homework.attachments.filter(att => att.type === studyResourcesType.THEORY || att.type === studyResourcesType.PRESENTATION || att.type === studyResourcesType.VIDEO).length;
            case 'File':
                // @ts-ignore
                return count + homework.fileAtachments.length;
            default:
                return count;
        }
    }, 0);
};

export { validateDate, setPropForItem, setIndexForGrade, currentTimeInItemRange, countHomeworkWithParam, getLessonTime };