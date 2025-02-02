"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninFormOnSubmit, SigninFormSchema } from '@/components/zod-schemas/forms/sign-in-schema';
import { useState } from 'react';

export default function SignInForm({ setIsTransitioning }: { setIsTransitioning: Function }) {
    const [disabled, setDisabled] = useState<boolean>(false);
    const DefinedSigninForm = useForm<z.infer<typeof SigninFormSchema>>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: {
            email: ''
        },
    });

    return (
        <Form {...DefinedSigninForm}>
            <form
                onSubmit={DefinedSigninForm.handleSubmit((data) => {
                    SigninFormOnSubmit(data, DefinedSigninForm, setDisabled, setIsTransitioning).then(() => setDisabled(false));
                })}
            >
                <div>
                    <FormField
                        name={'email'}
                        control={DefinedSigninForm.control}
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
                <Button
                    className='ml-auto mt-3 flex w-full'
                    type='submit'
                    disabled={disabled}
                >
                    Войти
                </Button>
            </form>
        </Form>
    );
}