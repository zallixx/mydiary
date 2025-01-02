import { cookies } from 'next/headers';
import { Profile } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import redis from '@/lib/redis';
import { decrypt, encrypt } from '@/utils/jwtHelpers';
import { decryptedSession } from '@/types/auth';

export async function createSession(profile: Profile, confirmationCode?: string) {
    const uuid = uuidv4();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const session = await encrypt({ profileId: profile.id, activated: false, uuid: uuid, confirmationCode: confirmationCode }, '5m');

    (await cookies()).set('session', session, {
        httpOnly: true,
        secure: true,
        priority: 'high',
        expires: expiresAt,
        path: '/',
    });

    if (!session) {
        throw new Error('Ошибка при инициализации сессии');
    }

    await redis.set(uuid, JSON.stringify({ session: session, activated: false }), { ex: 5 * 60 });

    return true;
}

export async function getSession() {
    const cookie = (await cookies()).get('session')?.value;

    if (!cookie) {
        return { decryptedSession: null, jwt: '' };
    }

    const decryptedSession = await decrypt(cookie);

    return { decryptedSession: decryptedSession, jwt: cookie};
}

export async function updateSession(oldSession: decryptedSession) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const checkSession = await redis.get(oldSession.uuid);

    if (!checkSession) {
        throw new Error('Сессия не найдена');
    }

    const newSession = await encrypt({ profileId: oldSession.profileId, activated: true, uuid: oldSession.uuid }, '7d');
    await redis.set(oldSession.uuid, JSON.stringify({ session: newSession, activated: true }), { ex: 7 * 24 * 60 * 60 });

    (await cookies()).set('session', newSession, {
        httpOnly: true,
        secure: true,
        priority: 'high',
        expires: expiresAt,
        path: '/',
    });

    return;
}