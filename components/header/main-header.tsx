'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react'
import { UserAvatar } from '@/components/user-avatar';
import { Profile } from '@prisma/client';
import Link from "next/link";
import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const mainComponents: { title: string; href: string; svg?: ReactElement; children?: {sub_title: string; sub_href: string; sub_children?: {sub_title: string; sub_href: string}[]; }[]; }[] =
	[
		{
			title: 'Дневник',
			href: `/diary/${new Date().toLocaleDateString('ru-RU')}`,
			svg: <svg width="18" height="18" viewBox="0 0 18 18" className=" _39kZUq4rPycYq0oCOeUqre"><path d="M7.073 7.42c.487 0 .94.082 1.359.242.418.16.78.388 1.082.68.301.292.538.643.71 1.052.17.41.255.863.255 1.36a3.49 3.49 0 01-.286 1.432c-.19.429-.455.797-.797 1.104a3.677 3.677 0 01-1.213.716c-.468.17-.974.256-1.52.256-.76 0-1.44-.16-2.04-.483a3.324 3.324 0 01-1.366-1.316l1.126-1.169c.273.38.614.683 1.023.907.41.224.833.336 1.272.336.526 0 .958-.158 1.293-.474.337-.318.505-.74.505-1.265 0-.507-.159-.916-.475-1.229-.316-.311-.719-.467-1.206-.467-.322 0-.621.073-.9.22-.277.145-.5.345-.665.598H3.52c0-.028.02-.138.06-.328l.146-.732c.058-.296.12-.628.189-.993s.141-.739.22-1.118c.175-.897.37-1.901.584-3.011h5.116V5.52H6.137l-.424 2.323c.117-.126.29-.228.519-.307.228-.077.51-.116.841-.116zM13.272 14.262a1.47 1.47 0 100-2.94 1.47 1.47 0 000 2.94z"></path><path d="M14 1.5c1.379 0 2.5 1.122 2.5 2.5v10c0 1.379-1.121 2.5-2.5 2.5H4A2.503 2.503 0 011.5 14V4c0-1.378 1.122-2.5 2.5-2.5h10zM14 0H4a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V4a4 4 0 00-4-4z"></path></svg>,
			children: [
				{ sub_title: 'Расписание', sub_href: `/diary/${new Date().toLocaleDateString('ru-RU')}` },
				{ sub_title: 'Оценки', sub_href: '',
					sub_children: [
						{ sub_title: 'Оценки', sub_href: '/diary/marks' },
						{ sub_title: 'Рейтинг', sub_href: '/diary/marks/rating' },
						{ sub_title: 'Архив оценок', sub_href: '/diary/marks/archive' }
					]
				},
				{ sub_title: 'Задания', sub_href: '/diary/tasks' },
				{ sub_title: 'Учеба', sub_href: '',
					sub_children: [
						{ sub_title: 'Предметы', sub_href: '/diary/study/subjects' },
						{ sub_title: 'Экзамены', sub_href: '/diary/study/exams' },
						{ sub_title: 'Академ. задолженности', sub_href: '/diary/study/debts' }
					]
				},
				{ sub_title: 'Школа', sub_href: '',
					sub_children: [
						{ sub_title: 'Кружки', sub_href: '/diary/school/circles' },
						{ sub_title: 'Посещаемость', sub_href: '/diary/school/attendance' },
						{ sub_title: 'О школе', sub_href: '/diary/school/about' }
					]
				}
				]
		},
		{
			title: 'Библеотека',
			href: '/library/',
			svg: <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>,
		},
		{
			title: 'Портфолио учащегося',
			href: '/portfolio/',
			svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>,
		},
		{
			title: 'Олимпиады для учащихся',
			href: '/olympiads/',
			svg: <svg width="18" height="18" viewBox="0 0 18 18" className=" _39kZUq4rPycYq0oCOeUqre"><path d="M9.4 3.2c.9 0 1.6-.7 1.6-1.6C11 .7 10.3 0 9.4 0c-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6zm6.3 8.1h-1.3V6.5c0-1.1-.9-1.9-1.9-1.9H6.6c-1.1 0-1.9.9-1.9 1.9v1.7H2.3c-1.1 0-1.9.9-1.9 1.9V16.2c0 1 .9 1.8 1.9 1.8h13.3c1 0 1.9-.8 1.9-1.8V13.3c.1-1.1-.8-2-1.8-2zm0 1.5c.3 0 .5.2.5.5V16c0 .3-.2.5-.5.5h-3.3c-.3 0-.5-.2-.5-.5v-2.7c0-.3.2-.5.5-.5h3.3zM1.8 10.2c0-.3.2-.5.5-.5h4.4c.3 0 .5.2.5.5V16c0 .3-.2.5-.5.5H2.3c-.3 0-.5-.2-.5-.5v-5.8zm6.8 6.3c.1-.2.1-.4.1-.6v-5.8c0-1.1-.9-1.9-1.9-1.9h-.7V6.5c0-.3.2-.5.5-.5h5.9c.3 0 .5.2.5.5v4.8h-.6c-1.1 0-1.9.9-1.9 1.9V16c0 .2 0 .4.1.6h-2z"></path></svg>,
		}
]


export default function MainHeader({ profile }: { profile: Profile }) {
	const currentPage = usePathname();
	return (
		<header className="fixed top-0 z-10 lg:translate-x-[-50%] lg:left-[50%] max-lg:w-full lg:min-w-[900px] lg:w-auto rounded-md bg-white px-2 dark:bg-[#17171a] transition-transform duration-500 ease-in">
			<div className="mx-auto max-w-5xl px-1 sm:px-2 lg:px-4">
				<div className="flex h-10 justify-between">
					<div className="flex px-2 lg:px-0">
						<div className="flex flex-shrink-0 items-center max-[520px]:hidden">
							<svg width="58" height="16" viewBox="0 0 58 16" className="cPILlsE_Z4-ss7JxdCXwl"><path d="M20.202 12.288l3.063-2.048c.847.96 2.02 1.6 3.324 1.6a3.95 3.95 0 002.215-.704c.652-.512 1.108-1.152 1.304-1.92h-4.692v-2.88h4.561a3.846 3.846 0 00-1.303-1.728c-.587-.448-1.369-.64-2.15-.64a4.48 4.48 0 00-3.259 1.408l-2.802-2.304c1.433-1.792 3.65-2.88 5.995-2.816 1.108 0 2.216.256 3.194.64.912.384 1.824.896 2.541 1.6 1.434 1.408 2.346 3.392 2.346 5.44 0 1.344-.39 2.624-1.108 3.84-.651 1.152-1.629 2.048-2.802 2.688-1.173.64-2.542 1.216-3.91 1.152-1.303.064-2.607-.448-3.78-.96-1.108-.64-2.02-1.408-2.737-2.368zM36.494.256h4.562v11.52h3.91V.256h4.562v11.52h3.91V.256H58v14.72H36.494M13.034.256l-4.171 5.76-3.65-5.76H0v14.72h4.562v-8.32c1.108 1.472 2.15 3.008 3.258 4.48h1.955c1.043-1.472 2.216-3.008 3.259-4.48v8.32h4.562V.256h-4.562z"></path></svg>
						</div>
						<nav className="hidden lg:ml-6 lg:flex lg:space-x-4 content-center items-center">
							{mainComponents.map((item) => (
								<Link
									key={item.title}
									href={item.href}
									className={`inline-flex items-center rounded-md py-1 text-base group  ${currentPage.startsWith('/' + item.href.split('/')[1]) ? 'font-bold' : ''}`}
								>
									<div className="mr-1 transition delay-150 duration-200 ease-in-out group-hover:-translate-y-0.5">{item.svg}</div>
									<span className="truncate max-w-xs transition duration-200 ease-in-out group-hover:-translate-y-1">{item.title}</span>
								</Link>
							))}
						</nav>
					</div>
					{/* <div className="lg:hidden bg-gray-200 p-2 rounded-md">New element</div> заглушка под кнопку на телефоне */}
					<div className="flex  items-center lg:ml-4">
						<button
							type="button"
							className="flex-shrink-0 transition duration-200 ease-in-out hover:-translate-y-0.5 bg-white p-1 text-black"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
								 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
						</button>
						<div className="relative ml-4 flex-shrink-0 rounded-full items-center justify-center content-center">
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<button
											type="button"
											className="flex items-center rounded-full bg-white group py-1"
										>
											<UserAvatar profile={profile} />
											<span className="ml-2 text-sm font-medium text-gray-700 transition duration-200 ease-in-out group-hover:-translate-y-0.5">{profile.name.split(' ')[0]}</span>
											<ChevronDown className="ml-1 h-5 w-5 text-gray-400 transition duration-200 ease-in-out group-hover:-translate-y-0.5" aria-hidden="true" />
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-64 h-64">
										<div className="flex flex-col items-center p-4">
											<img src={profile.image.toString()}  alt={profile.name} width={60} height={60} className="rounded-full"/>
											<DropdownMenuLabel className="text-center">
												Морзров Алексей Сергеевич
											</DropdownMenuLabel>
										</div>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="cursor-pointer">Настройки аккаунта</DropdownMenuItem>
										<DropdownMenuItem className="cursor-pointer">Выход</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-200 mx-auto max-w-5xl sm:px-2 lg:px-4 max-lg:hidden justify-between">
				<div className="flex h-12">
					<div className="flex px-2 lg:px-0 content-center items-center">
						<Image src={'/mesh-logo.png'} alt={'МЭШ'} width={32} height={32} className="flex flex-shrink-0 items-center "/>
						<span className="px-2 text-xl font-bold">Мой дневник</span>
						<nav className="lg:flex px-2.5 lg:space-x-7">
							{mainComponents.map((item) => (
								(currentPage.startsWith('/' + item.href.split('/')[1])) ? (
									item.children?.map((child) => (
										<Link
											key={child.sub_title}
											href={child.sub_href}
											className={`inline-flex items-center rounded-md py-1 text-base group ${(currentPage.startsWith('/diary/tasks') && child.sub_title === 'Задания') ? 'font-bold' : (currentPage.startsWith('/diary/') && child.sub_title === 'Расписание' && !(currentPage.startsWith('/diary/tasks'))) ? 'font-bold' : ''
}`}
										>
											<span
												className="truncate max-w-xs transition duration-200 ease-in-out group-hover:-translate-y-1">{child.sub_title}</span>
										</Link>
									))
								) : null)
							)}
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}
