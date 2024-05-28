import { z } from 'zod';

export const SupportMessageSchema = z.object({
    city: z.string().min(1, { message: "Поле не может быть пустым" }).max(50, { message: "Максимальная длина 50 символов" }).optional(),
    problemName: z.string().min(1, { message: "Поле не может быть пустым" }).max(50, { message: "Максимальная длина 50 символов" }).optional(),
    problemDescription: z.string().min(1, { message: "Поле не может быть пустым" }).max(450, { message: "Максимальная длина 450 символов" }).optional(),
});

export function SupportMessageFormOnSubmit(values: z.infer<typeof SupportMessageSchema>) {
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
    return fetchMessage();
}