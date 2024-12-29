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
import {
    SignupFormOnSubmit,
    SignupFormSchema
} from '@/components/zod-schemas/forms/sign-up-schema';
import { useState } from 'react';

export default function SignUpForm({ setIsTransitioning }: { setIsTransitioning: Function }) {
    const [disabled, setDisabled] = useState<boolean>(false);
    const DefinedSignupForm = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
        },
    });

    return (
        <Form {...DefinedSignupForm}>
            <form
                onSubmit={DefinedSignupForm.handleSubmit((data) => {
                    SignupFormOnSubmit(data, DefinedSignupForm, setDisabled, setIsTransitioning).then(() => setDisabled(false));
                })}
            >
                <div>
                    <FormField
                        name={'name'}
                        control={DefinedSignupForm.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
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
                <div>
                    <FormField
                        name={'surname'}
                        control={DefinedSignupForm.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Фамилия</FormLabel>
                                <FormControl>
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
                <div>
                    <FormField
                        name={'email'}
                        control={DefinedSignupForm.control}
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
                <div>
                    <FormField
                        name={'password'}
                        control={DefinedSignupForm.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Введите ваш пароль'
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
                    Зарегистрироваться
                </Button>
            </form>
        </Form>
    );
}