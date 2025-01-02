"use server";

import db from '@/lib/db';
import { hash, compare } from 'bcrypt';
import { createSession, updateSession } from '@/lib/auth/session';
import { decrypt } from '@/utils/jwtHelpers';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sendEmail } from '@/utils/email';
import { signInProps, signUpProps } from '@/types/auth';
import redis from '@/lib/redis';

export async function signUp(values: signUpProps) {
    const profile = await db.profile.findUnique({
        where: {
            email: values.email,
        },
    });

    if (profile) {
        return {
            errors: {
                email: {
                    message: 'Такая почта уже зарегистрирована',
                },
            },
        };
    }

    const hashedPassword = await hash(values.password, 12);
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 цифр

    const newProfile = await db.profile.create({
        data: {
            name: values.name,
            surname: values.surname,
            email: values.email,
            password: hashedPassword,
        }
    });

    await createSession(newProfile, confirmationCode);

    await sendEmail({profile: newProfile, subject: "Подтвердите свою почту", confirmationCode: confirmationCode});

    return;
}

export async function confirmAction(userCode: string) {
    const session = (await cookies()).get('session')?.value;

    if (!session) {
        return {
            errors: {
                otp: {
                    message: 'Время вышло',
                },
            },
        }
    }

    const toUpdateSession = await decrypt(session);

    if (!toUpdateSession) {
        return {
            errors: {
                otp: {
                    message: 'Время вышло',
                },
            },
        }
    }

    if (toUpdateSession.confirmationCode !== userCode) {
        return {
            errors: {
                otp: {
                    message: 'Неверный код подтверждения',
                },
            },
        }
    }

    await updateSession(toUpdateSession);

    return redirect('/');
}

export async function SignIn(values: signInProps) {
    const profile = await db.profile.findUnique({
        where: {
            email: values.email,
        },
    });

    if (!profile) {
        return {
            errors: {
                email: {
                    message: 'Проверьте правильность введенной почты и пароля',
                },
            },
        };
    }

    const isPasswordCorrect = await compare(values.password, profile.password);

    if (!isPasswordCorrect) {
        return {
            errors: {
                email: {
                    message: 'Проверьте правильность введенной почты и пароля',
                },
            },
        };
    }

    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 цифр
    await createSession(profile, confirmationCode);

    await sendEmail({profile: profile, subject: "Подтвердите вход в аккаунт", confirmationCode: confirmationCode});

    return;
}

export async function logout() {
    const cookieStore = await cookies();

    const cookie = cookieStore.get('session')?.value;

    if (!cookie) {
        return redirect('/sign-in');
    }
    

    cookieStore.delete('session');
    await redis.del(cookie);

    return redirect('/sign-in');
}