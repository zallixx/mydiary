import { z } from 'zod';
import { toast } from 'sonner';

export const SupportMessageSchema = z.object({
    city: z.string().min(1, { message: "Поле не может быть пустым" }).max(50, { message: "Максимальная длина 50 символов" }).optional(),
    problemName: z.string().min(1, { message: "Поле не может быть пустым" }).max(50, { message: "Максимальная длина 50 символов" }).optional(),
    problemDescription: z.string().min(1, { message: "Поле не может быть пустым" }).max(450, { message: "Максимальная длина 450 символов" }).optional(),
});

export async function SupportMessageFormOnSubmit(values: z.infer<typeof SupportMessageSchema>) {
    const fetchMessage = async () => {
        const response = await fetch('/api/support/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    };
    return fetchMessage().then(() => toast.success("Сообщение отправлено!")).catch(() => toast.error("Что-то пошло не так."));
}

export const SupportMessageAnswerSchema = z.object({
    answer: z.string().min(1, { message: "Поле не может быть пустым" }).optional(),
    supportMessageId: z.string().min(1, { message: "Поле не может быть пустым" }).optional(),
    profileEmail: z.string().min(1, { message: "Поле не может быть пустым" }).optional(),
});

export async function SupportMessageAnswerFormOnSubmit(values: z.infer<typeof SupportMessageAnswerSchema>) {
    const fetchMessage = async () => {
        const response = await fetch('/api/support/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    };
    return fetchMessage().then(() => toast.success("Ответ отправлен!")).catch(() => toast.error("Что-то пошло не так."));
}