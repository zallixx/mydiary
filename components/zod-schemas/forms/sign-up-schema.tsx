import { z } from 'zod'
import { signUp } from '@/lib/auth/auth';

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Имя должно быть не менее 3 символов.' })
        .trim(),
    surname: z
        .string()
        .min(3, { message: 'Фамилия должна быть не менее 3 символов.' })
        .trim(),
    email: z.string().email({ message: 'Некорректная почта' }).trim()
});

export async function SignupFormOnSubmit(values: z.infer<typeof SignupFormSchema>, form: any, setDisabled: Function, setIsTransitioning: Function) {
    setDisabled(true);
    const data = await SignupFormSchema.parseAsync(values);
    const result = await signUp(data);

    if (result?.errors) {
        form.setError('email', { type: 'manual', message: result.errors.email.message });
        setDisabled(false);
        return;
    }

    setIsTransitioning(true);

    return;
}