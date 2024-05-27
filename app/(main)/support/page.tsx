import SupportCard from '@/components/support/support-card';
import db from '@/lib/db';
import InitializeProfile from '@/lib/initualize-profile';
import { SupportMessage } from '@prisma/client';

export default async function SupportPage() {
    const profile = await InitializeProfile();

    const SupportMessages: SupportMessage[] = await db().supportMessage.findMany({
        where: {
            profileId: profile.id,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <SupportCard SupportMessages={SupportMessages}/>
    );
}