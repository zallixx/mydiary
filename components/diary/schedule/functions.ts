import { Homework, studyResourcesType } from '@prisma/client';

const validateDate = (date: string): boolean => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-([0-9]{4})$/;
    return dateRegex.test(date);
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

const currentTimeInItemRange = (itemDate: Date) => {
    const currentTime = new Date();
    return currentTime >= itemDate && currentTime < new Date(itemDate.getTime() + 45 * 60000);
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

export { validateDate, setPropForItem, setIndexForGrade, currentTimeInItemRange, countHomeworkWithParam };