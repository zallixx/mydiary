import { openDB } from 'idb';
import { homeworkProps } from '@/types/schedule';

const initDB = async () => {
    return await openDB('ScheduleDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('schedules')) {
                db.createObjectStore('schedules', { keyPath: 'dateString' });
            }
        },
    });
};

export async function saveToIndexedDB(dateString: string, schedule: object) {
    const db = await initDB();
    await db.put('schedules', {
        dateString,
        schedule,
        updatedAt: Date.now(),
    });
}

export async function updateScheduleInIndexedDB(dateString: string, updatedHomework: homeworkProps) {
    const db = await initDB();
    const existingEntry = await db.get('schedules', dateString);

    if (existingEntry) {
        const newSchedule = existingEntry.schedule.map((item: any) => {
            if (!item.homework) return item;
            const updatedHomeworkList = item.homework.map((hw: any) =>
                hw.id === updatedHomework.id ? updatedHomework : hw
            );
            return { ...item, homework: updatedHomeworkList };
        });
        await db.put('schedules', {
            dateString,
            schedule: newSchedule,
            updatedAt: Date.now(),
        });
    }
}

export async function getFromIndexedDB(dateString: string) {
    const db = await initDB();
    return await db.get('schedules', dateString);
}
