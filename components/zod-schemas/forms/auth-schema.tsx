import { z } from 'zod'
import { SignIn, signUp } from '@/lib/auth/auth';

export const AuthFormSchema = z.object({
    email: z.string().email({ message: 'Некорректная почта' }).trim(),
    name: z.string().trim().nullish(),
    surname: z.string().trim().nullish(),
});


export async function AuthFormOnSubmit(values: z.infer<typeof AuthFormSchema>, form: any, setDisabled: Function, setStage: Function, isLogin: boolean) {
    setDisabled(true);
    const data = await AuthFormSchema.parseAsync(values);

    if (isLogin) {
        // @ts-ignore
        const result = await SignIn(data);
        if (result?.errors) {
            form.setError('email', {type: 'manual', message: result.errors.email.message});
            setDisabled(false);
            return;
        }
    }

    if (!isLogin && data.name && data.surname) {
        // @ts-ignore
        const result = await signUp(data);
        if (result?.errors) {
            form.setError('email', {type: 'manual', message: result.errors.email.message});
            setDisabled(false);
            return;
        }
    }

    setStage('verification');

    return;
}