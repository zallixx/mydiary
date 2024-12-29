import { z } from 'zod';
import { confirmAction } from '@/lib/auth/auth';

export const OTPFormSchema = z.object({
    otp: z.string().length(6, {
        message: "Код подтверждения должен состоять из 6 цифр.",
    }),
})

export async function OTPFormOnSubmit(value: string, form: any) { // TODO: типизация
    const result = await confirmAction(value);

    if (result?.errors) {
        form.setError('otp', { type: 'manual', message: result.errors.otp.message });
    }

    return;
}