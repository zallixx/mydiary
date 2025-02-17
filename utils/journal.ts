function groupScheduleItemsByDate(scheduleItems: any[]) {
    const grouped: any = {};
    scheduleItems.forEach((item) => {
        const dateKey = item.startTime.toISOString().split('T')[0];
        if (!grouped[dateKey]) {
            grouped[dateKey] = {
                date: dateKey,
                dayOfWeek: item.startTime.toLocaleDateString('ru', { weekday: 'long' }),
                lessons: [],
            };
        }
        grouped[dateKey].lessons.push(item);
    });
    return Object.values(grouped);
}

export { groupScheduleItemsByDate };