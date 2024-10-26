import CurrentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { Homework, studyResourcesType  } from '@prisma/client';

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
	const startOfDay = new Date(Date.UTC(year, month - 1, day - 1, 23, 59, 59));
	const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));
	const dayOfWeek = startOfDay.getDay();

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

	const countHomeworkWithParam = (homeworkList: Homework[], param: string) => {
		return homeworkList.reduce((count: number, homework: Homework) => {
			switch (param) {
				case 'Test':
					// @ts-ignore
					return count + homework.attachments.filter(att => att.type === studyResourcesType.TEST).length;
				case 'Theory':
					// @ts-ignore
					return count + homework.attachments.filter(att => att.type === studyResourcesType.THEORY || att.type === studyResourcesType.PRESENTATION || att.type === studyResourcesType.VIDEO).length;
				case 'File':
					// @ts-ignore
					return count + homework.fileAtachments.length;
				default:
					return count;
			}
		}, 0);
	}

	return (
		<div className="min-h-screen flex items-start lg:pt-32 max-lg:pt-16 justify-center">
			<section
				className="static left-1/2 right-1/2 lg:w-[1400px] max-lg:w-[90%] max-[520px]:w-[95%] flex flex-col transition-hwp duration-500 ease-in-out">
				<div className="h-[80px] p-4 border-b bg-white rounded-md"></div>
				<div className="min-h-96 h-auto pt-2 space-y-2">
					{scheduleForDay.map((item: any, index) => (
						<div className="flex flex-col border-b rounded-2xl h-auto bg-white py-2" key={item.id}>
							<div className="flex flex-row">
								<div className={`h-11 w-1.5 rounded-r-full mt-1 mr-2 ${currentTimeInItemRange(item.baseSchedule.date) ? 'bg-[#16a3f5]' : 'bg-[#e8e8ef]'}`}></div>
								<div className="flex flex-col">
									<div className="flex flex-row items-center">
										<span className="text-base font-medium">{item.baseSchedule.subject.name}</span>
										<span className="text-sm ml-1">{index + 1 + ' урок'}</span>
									</div>
									<div>
									<span className="text-sm">
										{item.baseSchedule.date.getUTCHours().toString().padStart(2, '0') + ':' + item.baseSchedule.date.getUTCMinutes().toString().padStart(2, '0') + ' - ' + new Date(item.baseSchedule.date.getTime() + item.baseSchedule.duration * 60000).getUTCHours().toString().padStart(2, '0') + ':' + new Date(item.baseSchedule.date.getTime() + item.baseSchedule.duration * 60000).getUTCMinutes().toString().padStart(2, '0')}
									</span>
									</div>
								</div>
								<div className="ml-auto max-h-12">
									{item.assessment && (
										<div className="flex flex-row">
											{item.absence[0]?.type !== "NONE" && item.absence[0] ? (
												<>
													<div className="flex flex-col">
														{/* @ts-ignore */}
														{item.assessment.slice(0, 1).map((assessment) => (
															<div className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(assessment.gradeType)}`}>
																<span>
																	{assessment.grade}
																	<sub className="text-[10px] align-baseline">{setIndexForGrade(assessment.gradeType)}</sub>
																</span>
															</div>
														))}
														{item.assessment.length > 1 && (
															<span className="flex text-[12px] ml-1">
																еще {item.assessment.length - 1}
															</span>
														)}
													</div>
													<div className={`flex items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(item.absence[0]?.type)}`}>
														<span>
															Н
														</span>
													</div>
												</>
											) : (
												<div className="flex flex-col">
													<div className="flex flex-row">
														{/* @ts-ignore */}
														{item.assessment.slice(0, 2).map((assessment) => (
															<div className={`flex items-center justify-items-center justify-center bg-[#f4f4f8] mr-2 rounded-md w-[43px] h-[43px] font-semibold ${setPropForItem(assessment.gradeType)}`}>
																<span>
																	{assessment.grade}
																	<sub className="text-[10px] align-baseline">{setIndexForGrade(assessment.gradeType)}</sub>
																</span>
															</div>
														))}
													</div>
													{item.assessment.length > 2 && (
														<span className="flex text-[12px] ml-auto mr-3">
															еще {item.assessment.length - 2}
														</span>
													)}
												</div>
											)}
										</div>
									)}
								</div>
							</div>
							<div className="flex flex-row mt-2 mr-2">
								<span className="text-sm ml-1 break-all">
									{item.homework[0]?.description ? (
										<div>
											<div className="flex flex-row">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
													 fill="none"
													 className={`flex-none ml-2.5 mr-1 relative ${(item.homework[0]?.completions[0]?.isCompleted || (item.specificAssignment[0] && !item.homework[0]) || (!item.homework[0] && !item.specificAssignment[0])) ? 'text-green-600' : 'text-gray-700'}`}>
													<path fill="currentColor"
														  d="M13.167 14.333h-3a.833.833 0 0 1-.834-.833v-3a.666.666 0 0 0-.666-.667H7.333a.666.666 0 0 0-.666.667v3c0 .46-.373.833-.834.833h-3A.833.833 0 0 1 2 13.5V7.138a2.5 2.5 0 0 1 .953-1.965L7.69 1.44a.5.5 0 0 1 .62 0l4.737 3.733A2.5 2.5 0 0 1 14 7.137V13.5c0 .46-.373.833-.833.833"></path>
												</svg>
												<span className="max-[520px]:hidden">{'Домашняя работа: ' + item.homework[0].description}</span>
												<span className="flex min-[520px]:hidden">{item.homework.length + ' задание'}</span>
											</div>
											<div>
												{item.specificAssignment[0] && (
													<div className="flex flex-row mt-1">
														<svg stroke="currentColor" fill="currentColor" strokeWidth="0"
															 viewBox="0 0 512 512" height="16px" width="16px"
															 className={`flex-none ml-2.5 mr-1 ${(item.homework[0]?.completions[0]?.isCompleted || (item.specificAssignment[0] && !item.homework[0]) || (!item.homework[0] && !item.specificAssignment[0])) ? 'text-green-600' : 'text-gray-700'}`}
															 xmlns="http://www.w3.org/2000/svg">
															<path fill="none" strokeLinecap="round"
																  strokeLinejoin="round" strokeWidth="32"
																  d="M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 0 0 8 8h0a8 8 0 0 0 8-8l8-216c.58-8.64-7.34-16-16-16z"></path>
															<circle cx="256" cy="416" r="16" fill="none"
																	strokeLinecap="round" strokeLinejoin="round"
																	strokeWidth="32"></circle>
														</svg>
														<span className="flex max-[520px]:hidden">Дополнительное домашнее задание: {item.specificAssignment[0].description}</span>
														<span className="flex min-[520px]:hidden">{item.specificAssignment.length + ' дополнительное задание'}</span>
													</div>
													)}
											</div>
										</div>
									) : item.specificAssignment[0] ? (
										<div className="flex flex-row">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0"
												 viewBox="0 0 512 512" height="16px" width="16px"
												 className={`flex-none ml-2.5 mr-1 ${(item.homework[0]?.completions[0]?.isCompleted || (item.specificAssignment[0] && !item.homework[0] && item.specificAssignment[0]?.homeworkCompletion[0]?.isCompleted) || (!item.homework[0] && !item.specificAssignment[0])) ? 'text-green-600' : 'text-gray-700'}`}
												 xmlns="http://www.w3.org/2000/svg">
												<path fill="none" strokeLinecap="round"
													  strokeLinejoin="round" strokeWidth="32"
													  d="M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 0 0 8 8h0a8 8 0 0 0 8-8l8-216c.58-8.64-7.34-16-16-16z"></path>
												<circle cx="256" cy="416" r="16" fill="none"
														strokeLinecap="round" strokeLinejoin="round"
														strokeWidth="32"></circle>
											</svg>
											<span className="max-[520px]:hidden">Дополнительное домашнее задание: {item.specificAssignment[0].description}</span>
											<span className="min-[520px]:hidden">{item.specificAssignment.length + ' дополнительное задание'}</span>
										</div>
									) : (
										<div className="flex flex-row">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
												 className={`flex-none ml-2.5 mr-1 relative ${(item.homework[0]?.completions[0]?.isCompleted || (item.specificAssignment[0] && !item.homework[0]) || (!item.homework[0] && !item.specificAssignment[0])) ? 'text-green-600' : 'text-gray-700'}`}>
												<path fill="currentColor"
													  d="M13.167 14.333h-3a.833.833 0 0 1-.834-.833v-3a.666.666 0 0 0-.666-.667H7.333a.666.666 0 0 0-.666.667v3c0 .46-.373.833-.834.833h-3A.833.833 0 0 1 2 13.5V7.138a2.5 2.5 0 0 1 .953-1.965L7.69 1.44a.5.5 0 0 1 .62 0l4.737 3.733A2.5 2.5 0 0 1 14 7.137V13.5c0 .46-.373.833-.833.833"></path>
											</svg>
											<span>Домашнее задание не задано</span>
										</div>
									)}
								</span>
								{item.homework.length > 1 && (
									<span className="text-sm ml-1 break-all">{`и еще ${item.homework.length - 1}`}</span>
								)}
							</div>
							<div className="flex flex-row text-sm ml-3.5 mt-0.5 break-all space-x-1">
								{countHomeworkWithParam(item.homework, 'Test') > 0 && (
									<span className="text-[#fd7e14]">{countHomeworkWithParam(item.homework, 'Test')} выполнить</span>
								)}
								{countHomeworkWithParam(item.homework, 'Theory') > 0 && (
									<span className="text-[#cc4bdb]">{countHomeworkWithParam(item.homework, 'Theory')} изучить</span>
								)}
							</div>
							<div className="text-sm ml-3.5 break-all">
								{countHomeworkWithParam(item.homework, 'File') > 0 && (
									<span className="text-indigo-700">Учитель прикрепил файлы к заданию</span>
								)}
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
