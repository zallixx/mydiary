import { getFromIndexedDB, saveToIndexedDB } from '@/utils/scheduleDB';

const CACHE_EXPIRATION_MS = 5 * 60 * 1000;

export async function fetchSchedule(dateString: string) {
    const cachedData = await getFromIndexedDB(dateString);

    if (cachedData) {
        const isExpired = Date.now() - cachedData.updatedAt > CACHE_EXPIRATION_MS;
        if (!isExpired) {
            return cachedData.schedule;
        }
    }

    const response = await fetch('/api/schedule/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: dateString }),
    });
    const schedule = await response.json();

    await saveToIndexedDB(dateString, schedule);

    return schedule;
}
