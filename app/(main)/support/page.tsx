import SupportCard from '@/components/cards/support-card';
import db from '@/lib/db';
import { SupportMessage } from '@prisma/client';
import CurrentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';

export default async function SupportPage() {
	const profile = await CurrentProfile();

	if (profile.role !== 'ADMIN' && profile.role !== 'DEVELOPER') {
		return redirect('/');
	}

	const SupportMessages: SupportMessage[] = await db.supportMessage.findMany({
		where: {
			answer: null,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return (
		<div className='flex h-screen w-full max-w-screen-xl select-none items-center justify-center justify-items-center'>
			<SupportCard SupportMessages={SupportMessages} />
		</div>
	);
}
