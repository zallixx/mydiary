import CurrentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';

export default async function DiaryPage() {
	const profile = await CurrentProfile();

	if (!profile) {
		return redirect('/');
	} else if (profile.classId === null) {
		return redirect('/');
	}

return (
	<div>
111
	</div>
	);
}
