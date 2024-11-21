import CurrentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';

export default async function DiaryPage() {
	const profile = await CurrentProfile();

	if (!profile) {
		return redirect('/');
	} else if (profile.groups.length === 0) {
		return redirect('/');
	}

return (
	<div>
111
	</div>
	);
}
