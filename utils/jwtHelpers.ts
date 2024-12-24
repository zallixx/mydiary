import { decryptedSession, encryptPayload } from '@/types/auth';
import { jwtVerify, SignJWT } from 'jose';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: encryptPayload, expirationTime: string): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ''): Promise<decryptedSession | null> {
    if (!session) {
        return null;
    }
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        // @ts-ignore
        return payload;
    } catch (error) {
        return null;
    }
}