"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ConfForm from '@/components/forms/conf-form';
import SignUpForm from "@/components/forms/sign-up-form";

export default function SignUpCard() {
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
                <CardTitle>{stage === 'first' ? 'Регистрация' : 'Подтверждение'}</CardTitle>
            </CardHeader>
            <CardContent>
                {stage === 'first' ? (
                    <SignUpForm setIsTransitioning={setIsTransitioning} />
                ) : (
                    <ConfForm />
                )}
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-600">
                    Уже есть аккаунт?{" "}
                    <Link href="/sign-in" className="text-blue-600 hover:underline">
                        Войти
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}