import { JWTPayload } from 'jose';

interface emailProps {
    profile: Profile;
    subject: string;
    confirmationCode: string;
}

interface decryptedSession {
    profileId: string;
    activated: boolean;
    uuid: string;
    confirmationCode: string;
    iat: number;
    exp: number;
}

interface encryptPayload extends JWTPayload {
    profileId: string;
    activated: boolean;
    uuid: string;
    confirmationCode?: string;
}

interface serverSessionProps {
    session: string;
    activated: boolean;
}

interface signUpProps {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface signInProps {
    email: string;
    password: string;
}

export type { emailProps, decryptedSession, encryptPayload, signUpProps, signInProps, serverSessionProps };