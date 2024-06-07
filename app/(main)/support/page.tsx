import SupportCard from '@/components/cards/support-card';
import db from '@/lib/db';
import { SupportMessage } from '@prisma/client';
import CurrentProfile from '@/lib/current-profile';

export default async function SupportPage() {
    const profile = await CurrentProfile();

    const SupportMessages: SupportMessage[] = await db.supportMessage.findMany({
        where: {
            profileId: profile.id,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="flex justify-items-center items-center justify-center h-screen select-none w-full max-w-screen-xl">
            <SupportCard SupportMessages={SupportMessages}/>
        </div>
    );
}