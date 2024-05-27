import { z } from 'zod';

export const SupportMessageSchema = z.object({
    city: z.string().min(1, { message: "Поле не может быть пустым" }).max(50, { message: "Максимальная длина 50 символов" }).optional(),
    topic: z.string().min(1, { message: "Поле не может быть пустым" }).max(50, { message: "Максимальная длина 50 символов" }).optional(),
    description: z.string().min(1, { message: "Поле не может быть пустым" }).max(450, { message: "Максимальная длина 450 символов" }).optional(),
});

export function SupportMessageFormOnSubmit(values: z.infer<typeof SupportMessageSchema>) {
    console.log(values);
}