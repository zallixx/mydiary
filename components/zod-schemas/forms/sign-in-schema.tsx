import { z } from 'zod'
import { SignIn } from '@/lib/auth/auth';

export const SigninFormSchema = z.object({
    email: z.string().email({ message: 'Некорректная почта' }).trim(),
});


export async function SigninFormOnSubmit(values: z.infer<typeof SigninFormSchema>, form: any, setDisabled: Function, setIsTransitioning: Function) {
    setDisabled(true);
    const data = await SigninFormSchema.parseAsync(values);
    const result = await SignIn(data);

    if (result?.errors) {
        form.setError('email', { type: 'manual', message: result.errors.email.message });
        setDisabled(false);
        return;
    }

    setIsTransitioning(true);

    return;
}