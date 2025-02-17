import db from '@/lib/db';
import { redirect } from 'next/navigation';
import SupportMessageCard from '@/components/cards/support/support-message-card';
import { CurrentProfile } from '@/lib/auth/current-profile';

interface SupportMessagePageProps {
	params: Promise<{
		messageId: string;
	}>;
}

export default async function SupportMessagePage({
	params,
}: Readonly<SupportMessagePageProps>) {
	const { profile } = await CurrentProfile();
	const { messageId } = await params;

	if (!profile) {
		return redirect('/');
	}

	const SupportMessage = await db.supportMessage.findUnique({
		where: {
			id: messageId,
		},
		include: {
			profile: true,
		},
	});

	if (!SupportMessage) {
		return redirect('/');
	}

	return (
		<div className="min-h-screen flex items-start max-2xm:pt-16 2xm:pt-8 justify-center">
			<section className="static left-1/2 right-1/2 3xl:w-[1400px] 2xl:w-[1000px] flex flex-col transition duration-500 max-2xl:w-[95%] ease-in-out">
				<SupportMessageCard SupportMessage={SupportMessage} />
			</section>
		</div>
	);
}