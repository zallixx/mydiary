import { redirect } from 'next/navigation';
import SchedulePageClient from '@/components/diary/schedule/schedulepage-client';
import { CurrentProfile } from '@/lib/auth/current-profile';


export default async function DiaryPage() {
	const { profile } = await CurrentProfile();

	if (!profile) {
		return redirect('/');
	} else if (!profile.groups || profile.groups.length === 0) {
		return redirect('/');
	}

	return (
		<div>
			<SchedulePageClient />
		</div>
	);
}
