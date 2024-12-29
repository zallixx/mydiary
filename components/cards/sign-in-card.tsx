"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import ConfForm from '@/components/forms/conf-form';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SignInForm from '@/components/forms/sign-in-form';

export default function SignInCard() {
    const [stage, setStage] = useState<'first' | 'second'>('first');
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(false), 300);
            if (!isTransitioning) return;
            if (stage === 'first') {
                setTimeout(() => setStage('second'), 300);
            }
            return () => clearTimeout(timer);
        }
    }, [isTransitioning])

    return (
        <Card className={`w-[350px] transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <CardHeader>
                <CardTitle>{stage === 'first' ? 'Вход' : 'Подтверждение'}</CardTitle>
                <CardDescription>
                    {stage === 'second' && (
                        'Мы отправили вам код на почту. Пожалуйста, введите его'
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {stage === 'first' ? (
                    <SignInForm setIsTransitioning={setIsTransitioning} />
                ) : (
                    <ConfForm />
                )}
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-600">
                    Нет аккаунта?{" "}
                    <Link href="/sign-up" className="text-blue-600 hover:underline">
                        Зарегистрироваться
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}