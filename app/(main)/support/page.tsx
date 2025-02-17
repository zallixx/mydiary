import SupportCard from '@/components/cards/support/support-card';
import db from '@/lib/db';
import { SupportMessage } from '@prisma/client';
import { CurrentProfile } from '@/lib/auth/current-profile';
import { redirect } from 'next/navigation';

export default async function SupportPage() {
	const { profile } = await CurrentProfile();

	if (!profile) {
		return redirect('/auth');
	}

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
		<div className="min-h-screen flex items-start max-2xm:pt-16 2xm:pt-8 justify-center">
			<section className="static left-1/2 right-1/2 3xl:w-[1400px] 2xl:w-[1000px] flex flex-col transition duration-500 max-2xl:w-[95%] ease-in-out">
				<div className="flex flex-row justify-between max-2xm:justify-end items-end">
					<span className="max-sm:text-base text-2xl font-bold max-2xm:hidden">Обращения</span>
				</div>
				<SupportCard SupportMessages={SupportMessages} />
			</section>
		</div>
	);
}
