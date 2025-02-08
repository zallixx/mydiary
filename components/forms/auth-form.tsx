import { AuthFormOnSubmit, AuthFormSchema } from '@/components/zod-schemas/forms/auth-schema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function AuthForm({ isLogin, setStage }: { isLogin: boolean; setStage: Function }) {
    const [disabled, setDisabled] = useState<boolean>(false);

    const DefinedAuthForm = useForm<z.infer<typeof AuthFormSchema>>({
        resolver: zodResolver(AuthFormSchema),
        defaultValues: {
            email: '',
            name: '',
            surname: '',
        },
    });

    return (
        <Form {...DefinedAuthForm}>
            <form
                onSubmit={DefinedAuthForm.handleSubmit((data) => {
                    AuthFormOnSubmit(data, DefinedAuthForm, setDisabled, setStage, isLogin).then(() => setDisabled(false));
                })}
                className="space-y-3"
            >
                {!isLogin && (
                    <>
                        <div className="space-y-2">
                            <FormField
                                control={DefinedAuthForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl>
                                            {/* @ts-ignore */}
                                            <Input
                                                {...field}
                                                placeholder='Введите ваше имя'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={DefinedAuthForm.control}
                                name={"surname"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Фамилия</FormLabel>
                                        <FormControl>
                                            {/* @ts-ignore */}
                                            <Input
                                                {...field}
                                                placeholder='Введите вашу фамилию'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </>
                )}
                <div className="space-y-2">
                    <FormField
                        control={DefinedAuthForm.control}
                        name={"email"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Введите вашу почту'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={disabled}>
                    {isLogin ? "Войти" : "Зарегистрироваться"}
                </Button>
            </form>
        </Form>
    );
}