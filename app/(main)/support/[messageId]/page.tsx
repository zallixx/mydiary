import CurrentProfile from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

interface SupportMessagePageProps {
    readonly messageId: string;
}

export default async function SupportMessagePage({ params }: { params: SupportMessagePageProps }) {
    const profile = CurrentProfile();
    const { messageId } = params;

    if (!profile) {
        return auth().redirectToSignIn();
    }

    const SupportMessage = await db.supportMessage.findUnique({
        where: {
            id: messageId
        },
    });

    if (!SupportMessage) {
        return redirect('/');
    }

    return (
        <div>1</div>
    );
}