import CurrentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { validateDate } from "@/components/diary/schedule/functions";
import LessonItem from "@/components/diary/schedule/lesson-item";
import ScheduleDayPicker from "@/components/diary/schedule/schedule-day-picker";


interface DiaryPageProps {
	params: {
		diaryDay: string;
	};
}

export default async function DiaryPage({
											params,
										}: DiaryPageProps
) {
	const profile = await CurrentProfile();

	if (!profile) {
		return redirect('/');
	} else if (profile.groups.length === 0) {
		return redirect('/');
	}

	if (!validateDate(params.diaryDay)) {
		return redirect('/');
	}

	const [day, month, year] = params.diaryDay.split('-').map(Number);
	const startOfDay = new Date(Date.UTC(year, month - 1, day - 1, 23, 59, 59));
	const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));
	const dayOfWeek = endOfDay.getDay();

	const scheduleForDay = await db.weeklySchedule.findMany({
		where: {
			dayOfWeek: dayOfWeek,
			groupId: {
				in: profile.groups.map((group) => group.id),
			},
		},
		orderBy: {
			baseSchedule: {
				date: 'asc',
			},
		},
		include: {
			specificAssignment: {
				where: {
					profile: {
						some: {
							id: profile.id
						}
					},
					date: {
						gt: startOfDay,
						lt: endOfDay,
					}
				},
				include: {
					homeworkCompletion: {
						where: {
							profileId: profile.id
						}
					}
				}
			},
			baseSchedule: {
				include: {
					subject: true,
					teacher: true,
				}
			},
			absence: {
				where: {
					profileId: profile.id,
					date: {
						gt: startOfDay,
						lt: endOfDay,
					}
				}
			},
			assessment: {
				where: {
					profileId: profile.id,
					date: {
						gt: startOfDay,
						lt: endOfDay,
					}
				}
			},
			homework: {
				where: {
					groupId: {
						in: profile.groups.map((group) => group.id),
					},
					date: {
						gt: startOfDay,
						lt: endOfDay,
					},
				},
				include: {
					fileAtachments: true,
					attachments: true,
					completions: {
						where: {
							profileId: profile.id
						}
					},
				}
			},
		}
	});

	return (
		<div className="min-h-screen flex items-start lg:pt-32 max-lg:pt-16 justify-center">
			<section className="static left-1/2 right-1/2 lg:w-[1400px] max-lg:w-[90%] max-[520px]:w-[95%] flex flex-col transition-hwp duration-500 ease-in-out">
				<ScheduleDayPicker />
				<div className="min-h-96 h-auto pt-2 space-y-2">
					{scheduleForDay.map((item, index) => (
						<LessonItem item={item} index={index} key={item.id} />
					))}
				</div>
			</section>
		</div>
	);
}
