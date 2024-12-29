import db from '@/lib/db';
import { redirect } from 'next/navigation';
import SupportMessageCard from '@/components/cards/support-message-card';
import { CurrentProfile } from '@/lib/auth/current-profile';

interface SupportMessagePageProps {
	params: {
		messageId: string;
	};
}

export default async function SupportMessagePage({
	params,
}: Readonly<SupportMessagePageProps>) {
	const { profile } = await CurrentProfile();
	const { messageId } = params;

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
		<div className='flex h-screen w-full max-w-screen-xl select-none items-center justify-center justify-items-center'>
			<SupportMessageCard SupportMessage={SupportMessage} />
		</div>
	);
}
