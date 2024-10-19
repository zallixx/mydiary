import CurrentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import db from '@/lib/db';

interface DiaryPageProps {
	params: {
		diaryDay: string;
	};
}

function validateDate(date: string): boolean {
	const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-([0-9]{4})$/;
	return dateRegex.test(date);
}

export default async function DiaryPage({
											params,
										}: DiaryPageProps
) {
	const profile = await CurrentProfile();

	if (!profile) {
		return redirect('/');
	} else if (profile.classId === null) {
		return redirect('/');
	}

	if (!validateDate(params.diaryDay)) {
		return redirect('/');
	}

	const scheduleForDay = await db.scheduleItem.findMany({
		where: {
			studentSchedule: {
				studentId: profile.id,
			},
			date: {
				lt: new Date(),
				gt: new Date(new Date().setHours(0, 0, 0, 0)),
			},
		},
		include: {
			subject: true,
			assessments: {
				where: {
					date: {
						lt: new Date(),
					},
				}
			},
		}
	});

	console.log(scheduleForDay);

return (
	<div>

	</div>
	);
}
