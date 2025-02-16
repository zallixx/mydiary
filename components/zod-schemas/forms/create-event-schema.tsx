import { z } from 'zod';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const CreateEventFormSchema = z.object({
    name: z.string().min(1, { message: 'Поле не может быть пустым' }).max(50, { message: 'Максимальная длина 50 символов' }),
    description: z.string().min(1, { message: 'Поле не может быть пустым' }).max(450, { message: 'Максимальная длина 450 символов' }),
    startTime: z.string().min(1, { message: 'Поле не может быть пустым' }),
    endTime: z.string().min(1, { message: 'Поле не может быть пустым' }),
    date: z.date(),
    place: z.string().min(1, { message: 'Поле не может быть пустым' }).max(50, { message: 'Максимальная длина 50 символов' }),
    recurrence: z.string(),
    selectedDays: z.array(z.string()),
});

export async function CreateEventFormOnSubmit(values: z.infer<typeof CreateEventFormSchema>) {
    const data = await CreateEventFormSchema.parseAsync(values);
    const dateString = format(data.date, "yyyy-MM-dd");
    const startDateTime = new Date(`${dateString}T${data.startTime}Z`);
    const endDateTime = new Date(`${dateString}T${data.endTime}Z`);
    console.log(startDateTime, endDateTime);

    let recurrenceRule = null;
    if (data.recurrence !== "none") {
        if (data.recurrence === "daily") {
            recurrenceRule = "RRULE:FREQ=DAILY";
        } else if (data.recurrence === "weekly") {
            const dayMap: Record<string, string> = {
                mon: "MO",
                tue: "TU",
                wed: "WE",
                thu: "TH",
                fri: "FR",
                sat: "SA",
                sun: "SU",
            };
            const byDay = data.selectedDays.map((day) => dayMap[day]).join(",");
            recurrenceRule = `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`;
        }
    }

    const response = await fetch('/api/createEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            description: data.description,
            startDateTime: startDateTime.toISOString(),
            endDateTime: endDateTime.toISOString(),
            place: data.place,
            recurring: data.recurrence !== "none",
            recurrenceRule: recurrenceRule,
        }),
    });
    if (!response.ok) {
        throw new Error(`Что-то пошло не так...`);
    } else {
        toast.success('Событие создано!');
    }

    return;
}