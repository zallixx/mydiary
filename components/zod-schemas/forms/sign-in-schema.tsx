import { z } from 'zod'
import { SignIn } from '@/lib/auth/auth';

export const SigninFormSchema = z.object({
    email: z.string().email({ message: 'Некорректная почта' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Пароль должен быть не менее 8 символов.' })
        .regex(/[a-zA-Z]/, { message: 'Пароль должен содержать буквы.' })
        .regex(/[0-9]/, { message: 'Пароль должен содержать цифры.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Пароль должен содержать специальные символы.',
        })
        .trim(),

});


export async function SigninFormOnSubmit(values: z.infer<typeof SigninFormSchema>, form: any, setDisabled: Function, setIsTransitioning: Function) {
    setDisabled(true);
    const data = await SigninFormSchema.parseAsync(values);
    const result = await SignIn(data);

    if (result?.errors) {
        form.setError('password', { type: 'manual', message: result.errors.email.message });
        setDisabled(false);
        return;
    }

    setIsTransitioning(true);

    return;
}