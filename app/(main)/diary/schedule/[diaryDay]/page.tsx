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
	} else if (profile.groups.length === 0) {
		return redirect('/');
	}

	if (!validateDate(params.diaryDay)) {
		return redirect('/');
	}

	const [day, month, year] = params.diaryDay.split('-').map(Number);
	const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
	const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));

	const scheduleForDay = await db.scheduleItem.findMany({
		where: {
			groupSchedule: {
				group: {
					id: {
						in: profile.groups.map((group) => group.id),
					},
				},
			},
			date: {
				lt: endOfDay,
				gt: startOfDay,
			},
		},
		orderBy: {
			date: 'asc',
		},
		include: {
			subject: true,
			assessments: true,
			homework: true,
		},
	});

	const setPropForItem = (item: string) => {
		switch (item) {
			case 'UNAUTHORIZED':
				return 'text-[#dc143c]';
			case 'SICK':
				return 'text-[#15b1d4]';
			case 'Контрольная работа':
				return 'border border-[#dc143c]';
		}
	};

	const setIndexForGrade = (item: string) => {
		switch (item) {
			case 'Олимпиада':
				return 3;
			case 'Контрольная работа':
				return 2;
		}
	}

	const currentTimeInItemRange = (itemDate: Date) => {
		const currentTime = new Date();
		return currentTime >= itemDate && currentTime < new Date(itemDate.getTime() + 45 * 60000);
	};

return (
    <div className="min-h-screen flex items-start lg:pt-32 max-lg:pt-16 justify-center">
		<section className="static left-1/2 right-1/2 lg:w-[1400px] max-lg:w-[90%] max-[520px]:w-[95%] flex flex-col transition-hwp duration-500 ease-in-out">
			<div className="h-[80px] p-4 border-b bg-white rounded-md"></div>
			<div className="min-h-96 h-auto pt-2 space-y-2">
				{scheduleForDay.map((item, index) => (
					<div className="flex flex-col border-b rounded-2xl min-h-32 h-auto bg-white py-2 space-y-2" key={item.id}>
						<div className="flex flex-row">
							<div className={`h-11 w-1.5 rounded-r-full mt-1 mr-2 ${currentTimeInItemRange(item.date) ? 'bg-[#16a3f5]' : 'bg-[#e8e8ef]'}`}></div>
							<div className="flex flex-col">
								<div className="flex flex-row items-center">
									<span className="text-base font-medium">{item.subject.name}</span>
									<span className="text-sm ml-1">{index + 1 + ' урок'}</span>
								</div>
								<div>
									<span className="text-sm">
										{item.date.getUTCHours().toString().padStart(2, '0') + ':' + item.date.getUTCMinutes().toString().padStart(2, '0') + ' - ' + new Date(item.date.getTime() + item.duration * 60000).getUTCHours().toString().padStart(2, '0') + ':' + new Date(item.date.getTime() + item.duration * 60000).getUTCMinutes().toString().padStart(2, '0')}
									</span>
								</div>
							</div>
							<div className="ml-auto max-h-12">
								{item.assessments && (
									<div className="flex flex-row">
										{item.absenceType !== "NONE" ? (
											<>
												<div className="flex flex-col">
													{item.assessments.slice(0, 1).map((assessment) => (
														<div
															className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[42px] h-[42px] font-semibold ${setPropForItem(assessment.gradeType)}`}>
																<span>
																	{assessment.grade}
																</span>
														</div>
													))}
													{item.assessments.length > 1 && (
														<span className="flex text-[12px] ml-1">
																еще {item.assessments.length - 1}
															</span>
													)}
												</div>
												<div className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[42px] h-[42px] font-semibold ${setPropForItem(item.absenceType)}`}>
													<span>
														Н
													</span>
												</div>
											</>
										) : (
											<div className="flex flex-col">
												<div className="flex flex-row">
													{item.assessments.slice(0, 2).map((assessment) => (
														<div
															className={`flex items-center justify-items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[42px] h-[42px] font-semibold ${setPropForItem(assessment.gradeType)}`}>
															<span>
																{assessment.grade}
																<sub className="text-[10px] align-baseline">{setIndexForGrade(assessment.gradeType)}</sub>
															</span>
														</div>
													))}
												</div>
												{item.assessments.length > 2 && (
													<span className="flex text-[12px] ml-auto mr-3">
															еще {item.assessments.length - 2}
													</span>
												)}
											</div>
											)
										}
									</div>
								)}
							</div>
						</div>
						<div>

						</div>
					</div>
				))}
			</div>
		</section>
	</div>
);
}
