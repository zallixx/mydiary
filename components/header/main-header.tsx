'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react'
import { UserAvatar } from '@/components/user-avatar';
import { Profile } from '@prisma/client';
import Link from "next/link";
import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useClerk } from '@clerk/nextjs';
import {Label } from '@radix-ui/react-menu';


const mainComponents: { title: string; href: string; svg?: ReactElement; children?: {sub_title: string; sub_href: string; sub_children?: {sub_title: string; sub_href: string; svg?: ReactElement}[]; }[]; }[] =
	[
		{
			title: 'Дневник',
			href: `/diary/schedule/${new Date().toLocaleDateString('ru-RU')}`,
			svg: <svg width="18" height="18" viewBox="0 0 18 18"><path d="M7.073 7.42c.487 0 .94.082 1.359.242.418.16.78.388 1.082.68.301.292.538.643.71 1.052.17.41.255.863.255 1.36a3.49 3.49 0 01-.286 1.432c-.19.429-.455.797-.797 1.104a3.677 3.677 0 01-1.213.716c-.468.17-.974.256-1.52.256-.76 0-1.44-.16-2.04-.483a3.324 3.324 0 01-1.366-1.316l1.126-1.169c.273.38.614.683 1.023.907.41.224.833.336 1.272.336.526 0 .958-.158 1.293-.474.337-.318.505-.74.505-1.265 0-.507-.159-.916-.475-1.229-.316-.311-.719-.467-1.206-.467-.322 0-.621.073-.9.22-.277.145-.5.345-.665.598H3.52c0-.028.02-.138.06-.328l.146-.732c.058-.296.12-.628.189-.993s.141-.739.22-1.118c.175-.897.37-1.901.584-3.011h5.116V5.52H6.137l-.424 2.323c.117-.126.29-.228.519-.307.228-.077.51-.116.841-.116zM13.272 14.262a1.47 1.47 0 100-2.94 1.47 1.47 0 000 2.94z"></path><path d="M14 1.5c1.379 0 2.5 1.122 2.5 2.5v10c0 1.379-1.121 2.5-2.5 2.5H4A2.503 2.503 0 011.5 14V4c0-1.378 1.122-2.5 2.5-2.5h10zM14 0H4a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V4a4 4 0 00-4-4z"></path></svg>,
			children: [
				{ sub_title: 'Расписание', sub_href: `/diary/schedule/${new Date().toLocaleDateString('ru-RU')}` },
				{ sub_title: 'Задания', sub_href: '/diary/tasks' },
				{ sub_title: 'Оценки', sub_href: '/diary/marks',
					sub_children: [
						{ sub_title: 'Оценки', sub_href: '/diary/marks', svg: <svg viewBox="0 0 24 24" height="20" width="20" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 16.067c.151 0 .302.035.44.105L16.02 18l-.681-3.857a.913.913 0 01.275-.825l2.885-2.725-3.993-.568a.948.948 0 01-.715-.504L12 6l-1.792 3.52a.948.948 0 01-.715.505l-3.993.568 2.885 2.725c.226.214.33.522.275.825L7.98 18l3.581-1.828a.976.976 0 01.44-.105zM17.284 21a.947.947 0 01-.44-.108L12 18.362l-4.844 2.53A.948.948 0 015.78 19.89l.924-5.345-3.915-3.784a.948.948 0 01.524-1.622l5.416-.786 2.42-4.868c.32-.645 1.381-.645 1.702 0l2.42 4.868 5.416.786a.947.947 0 01.524 1.622l-3.914 3.784.923 5.345a.95.95 0 01-.936 1.11z"></path></svg>, },
						{ sub_title: 'Рейтинг', sub_href: '/diary/marks/rating', svg: <svg viewBox="0 0 24 24" height="20" width="20" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 4c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1V5c0-.55-.45-1-1-1zm7 8c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1s1-.45 1-1v-7c0-.55-.45-1-1-1zM4 9c0-.55.45-1 1-1s1 .45 1 1v11c0 .55-.45 1-1 1s-1-.45-1-1V9z"></path></svg>, },
						{ sub_title: 'Архив оценок', sub_href: '/diary/marks/archive', svg: <svg viewBox="0 0 24 24" height="20" width="20" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M9.866 14h4.268c.476 0 .866-.39.866-.866v-.268a.869.869 0 00-.866-.866H9.866a.868.868 0 00-.866.866v.268c0 .476.39.866.866.866zM18 18c0 .551-.448 1-1 1H7c-.551 0-1-.449-1-1V9h12v9zM6 5h12a1.001 1.001 0 010 2H6c-.551 0-1-.449-1-1 0-.551.449-1 1-1zm15 1c0-1.654-1.346-3-3-3H6C4.346 3 3 4.346 3 6c0 .883.391 1.67 1 2.22V18c0 1.654 1.346 3 3 3h10c1.654 0 3-1.346 3-3V8.22c.609-.55 1-1.337 1-2.22z"></path></svg>, }
					]
				},
				{ sub_title: 'Учеба', sub_href: '/diary/study',
					sub_children: [
						{ sub_title: 'Предметы', sub_href: '/diary/study/subjects', svg: <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20"><path d="M22.5 7.5L13 2.6c-.7-.3-1.5-.3-2.1 0L1.5 7.5C.9 7.8.6 8.4.6 9s.3 1.2.9 1.4l3.2 1.7v6.1c0 1.8 3.6 4 7.3 4 3.8 0 7.3-2.3 7.3-4v-6.1l2.3-1.2v5c0 .5.4.9.9.9s.9-.4.9-.9V9c0-.6-.3-1.2-.9-1.5zm-5 10.7c-.2.6-2.5 2.3-5.5 2.3s-5.4-1.7-5.5-2.2V13l4.5 2.3c.3.2.7.3 1.1.3.4 0 .7-.1 1.1-.3l4.5-2.3-.2 5.2zm-5.3-4.5c-.2.1-.3.1-.5 0L2.6 9l9.2-4.8c.2-.1.3-.1.5 0L21.4 9l-9.2 4.7z"></path></svg>, },
						{ sub_title: 'Экзамены', sub_href: '/diary/study/exams', svg: <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20"><path fillRule="evenodd" clipRule="evenodd" d="M18 14.586c-.396.177-1.175.414-2.5.414-1.124 0-2.101-.383-3.135-.788-1.162-.455-2.364-.926-3.865-.926-1.057 0-1.876.127-2.5.298V5.416C6.396 5.239 7.177 5 8.5 5c1.124 0 2.101.383 3.135.788 1.162.455 2.364.926 3.865.926.938 0 1.776-.101 2.5-.3v8.172zm1.268-9.906a1.79 1.79 0 00-1.599-.253c-.576.187-1.326.287-2.169.287-1.124 0-2.101-.383-3.135-.788C11.203 3.47 10.001 3 8.5 3c-2.887 0-4.005.952-4.2 1.144a.996.996 0 00-.3.713V20a1 1 0 102 0v-4.298c.395-.176 1.173-.416 2.5-.416 1.124 0 2.101.383 3.135.788 1.162.455 2.364.926 3.865.926 1.809 0 2.923-.378 3.541-.695.592-.307.959-.903.959-1.556V6.106c0-.56-.273-1.093-.732-1.426z"></path></svg>, },
						{ sub_title: 'Академ. задолженности', sub_href: '/diary/study/debts', svg: <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20"><path fillRule="evenodd" clipRule="evenodd" d="M11 9a1 1 0 012 0v4a1 1 0 01-2 0V9zm0 7a1 1 0 112 0 1 1 0 01-2 0zm9.865 2.353c-.23.405-.675.647-1.193.647H4.328c-.518 0-.964-.242-1.192-.647a.971.971 0 01.017-1.017l7.67-12.718c.468-.774 1.886-.774 2.353 0l7.672 12.718c.266.44.125.827.017 1.017zm1.696-2.05L14.889 3.584c-.6-.992-1.68-1.584-2.89-1.584-1.21 0-2.29.592-2.887 1.584L1.44 16.303a2.973 2.973 0 00-.046 3.033C1.973 20.363 3.098 21 4.328 21h15.344c1.23 0 2.355-.637 2.935-1.664.54-.956.523-2.09-.046-3.033z"></path></svg>, }
					]
				},
				{ sub_title: 'Школа', sub_href: '/diary/school',
					sub_children: [
						{ sub_title: 'Кружки', sub_href: '/diary/school/circles', svg: <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20"><path fillRule="evenodd" clipRule="evenodd" d="M10.5 6.5a1.5 1.5 0 113.001.001A1.5 1.5 0 0110.5 6.5zm4.201 2.75a1.5 1.5 0 112.6-1.5 1.5 1.5 0 01-2.6 1.5zM8.75 7.201a1.5 1.5 0 10-1.5 2.6 1.5 1.5 0 001.5-2.6zM5.757 13.34a1.499 1.499 0 112.486-1.678 1.5 1.5 0 11-2.486 1.678zM15.881 15h-1.65a2.502 2.502 0 00-2.5 2.5c0 .606.224 1.193.63 1.653.125.14.166.305.122.488-.05.205-.285.338-.594.358a8.01 8.01 0 01-5.946-2.773c-1.515-1.755-2.18-4.004-1.87-6.332.512-3.833 3.959-6.862 7.85-6.895h.075c2.357 0 4.578.9 6.107 2.478 1.288 1.329 1.96 3.024 1.89 4.772-.08 1.998-2.002 3.751-4.114 3.751zm3.659-9.916C17.617 3.101 14.815 1.993 11.906 2h-.001c-4.944.042-9.164 3.752-9.813 8.631a10.057 10.057 0 002.338 7.903A10.006 10.006 0 0011.86 22h.039c1.2 0 2.258-.787 2.527-1.886a2.517 2.517 0 00-.567-2.288.494.494 0 01-.128-.325.5.5 0 01.5-.5h1.65c3.192 0 5.99-2.598 6.112-5.672.092-2.3-.78-4.517-2.453-6.244z"></path></svg>, },
						{ sub_title: 'Посещаемость', sub_href: '/diary/school/attendance', svg: <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20"><path fillRule="evenodd" clipRule="evenodd" d="M10 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0 6c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm11.656-6.754a1 1 0 00-1.41.098l-1.867 2.145-.634-.71a.999.999 0 10-1.49 1.335l1.39 1.553a1 1 0 00.744.333h.007c.287-.002.56-.127.748-.343l2.611-3a1 1 0 00-.099-1.411zM3 20c0-3.86 3.141-7 7-7s7 3.14 7 7a1 1 0 11-2 0c0-2.757-2.243-5-5-5s-5 2.243-5 5a1 1 0 11-2 0z"></path></svg>, },
						{ sub_title: 'О школе', sub_href: '/diary/school/about', svg: <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20"><path fillRule="evenodd" clipRule="evenodd" d="M11 8c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm0 3c0-.6.4-1 1-1s1 .4 1 1v5c0 .6-.4 1-1 1s-1-.4-1-1v-5zm1 9c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-18C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path></svg>, }
					]
				}
				]
		},
		{
			title: 'Библиотека',
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
			svg: <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9.4 3.2c.9 0 1.6-.7 1.6-1.6C11 .7 10.3 0 9.4 0c-.9 0-1.6.7-1.6 1.6 0 .9.7 1.6 1.6 1.6zm6.3 8.1h-1.3V6.5c0-1.1-.9-1.9-1.9-1.9H6.6c-1.1 0-1.9.9-1.9 1.9v1.7H2.3c-1.1 0-1.9.9-1.9 1.9V16.2c0 1 .9 1.8 1.9 1.8h13.3c1 0 1.9-.8 1.9-1.8V13.3c.1-1.1-.8-2-1.8-2zm0 1.5c.3 0 .5.2.5.5V16c0 .3-.2.5-.5.5h-3.3c-.3 0-.5-.2-.5-.5v-2.7c0-.3.2-.5.5-.5h3.3zM1.8 10.2c0-.3.2-.5.5-.5h4.4c.3 0 .5.2.5.5V16c0 .3-.2.5-.5.5H2.3c-.3 0-.5-.2-.5-.5v-5.8zm6.8 6.3c.1-.2.1-.4.1-.6v-5.8c0-1.1-.9-1.9-1.9-1.9h-.7V6.5c0-.3.2-.5.5-.5h5.9c.3 0 .5.2.5.5v4.8h-.6c-1.1 0-1.9.9-1.9 1.9V16c0 .2 0 .4.1.6h-2z"></path></svg>,
		}
];


export default function MainHeader({ profile }: { profile: Profile }) {
	const currentPage = usePathname();
	const { signOut } = useClerk();

	const profileComponents: { title: string; href: string; svg?: ReactElement; onClick?: () => void }[] = [{
		title: 'Настройки аккаунта',
		href: '/profile/settings',
		svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
	},
	{
		title: 'Выйти из аккаунта',
		href: '',
		svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
		onClick: () => signOut({ redirectUrl: '/' }),
	}];

	return (
		<>
			<header className="fixed top-0 z-10 lg:translate-x-[-50%] lg:left-[50%] max-lg:w-full lg:min-w-[1400px] lg:w-auto rounded-md bg-white px-2 dark:bg-[#17171a] transition-transform duration-500 ease-in-out">
				<div className="mx-auto px-1 sm:px-2 lg:px-4">
					<div className="flex h-12 lg:h-14 justify-between">
						<div className="flex px-2 lg:px-0">
							<div className="flex flex-shrink-0 items-center max-[520px]:hidden">
								<Image width={100} height={150} src="/mai.svg" alt="Icon"/>
							</div>
							<nav className="hidden lg:ml-6 lg:flex lg:space-x-4 content-center items-center">
								{mainComponents.map((item) => (
									<Link
										key={item.title}
										href={item.href}
										className={`inline-flex items-center rounded-md py-1 text-base group ${currentPage.startsWith('/' + item.href.split('/')[1]) ? 'font-bold' : ''}`}
									>
										<div className="mr-1 transition delay-150 duration-200 ease-in-out group-hover:-translate-y-0.5">{item.svg}</div>
										<span className="truncate max-w-xs transition duration-200 ease-in-out group-hover:-translate-y-1">{item.title}</span>
									</Link>
								))}
							</nav>
						</div>
						{/* <div className="lg:hidden bg-gray-200 p-2 rounded-md">New element</div> заглушка под кнопку на телефоне */}
						<div className="flex items-center lg:ml-4">
							<button
								type="button"
								className="flex-shrink-0 transition duration-200 ease-in-out hover:-translate-y-0.5 bg-white p-1 text-black"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
									 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
							</button>
							<div className="relative ml-4 flex-shrink-0 rounded-full items-center justify-center content-center">
								<div className="group">
									<Tooltip delayDuration={300}>
										<TooltipTrigger>
											<div className="flex items-center rounded-full bg-white py-1">
												<UserAvatar profile={profile} />
												<span className="ml-2 text-sm font-medium text-gray-700 transition duration-200 ease-in-out group-hover:-translate-y-0.5">{profile.name.split(' ')[0]}</span>
												<ChevronDown className="ml-1 h-5 w-5 text-gray-400 transition duration-200 ease-in-out group-hover:-translate-y-0.5 group-hover:rotate-180" aria-hidden="true" />
											</div>
										</TooltipTrigger>
										<TooltipContent className="w-64">
											<div className="flex flex-col items-center p-2 border-b border-gray-200">
												<img src={profile.image!.toString()} alt={profile.name} width={60} height={60} className="rounded-full"/>
												<Label className="text-center text-base">
													{profile.name}
												</Label>
											</div>
											{profileComponents.map((item) => (
												<div key={item.title} className="pt-2" onClick={item.onClick}>
													<Link href={item.href} className='inline-flex items-center'>
														<div className="mr-1">{item.svg}</div>
														{item.title}
													</Link>
												</div>
											))}
										</TooltipContent>
									</Tooltip>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-gray-200 mx-auto sm:px-2 lg:px-4 max-lg:hidden justify-between">
					<div className="flex h-12 lg:h-14">
						<div className="flex px-2 lg:px-0 content-center items-center">
							{usePathname().startsWith('/diary') && (
								<>
									<Image src={'/mesh-logo.png'} alt={'МЭШ'} width={32} height={32} className="flex flex-shrink-0 items-center "/>
									<span className="px-2 text-xl font-bold">Мой дневник</span>
								</>
							)}
							<nav className="lg:flex px-2.5 lg:space-x-7">
								{mainComponents.map((item) => (
									(currentPage.startsWith('/' + item.href.split('/')[1])) ? (
										item.children?.map((child) => (
											<div className="group">
												<Tooltip delayDuration={300}>
													<TooltipTrigger>
														<Link
															href={child.sub_href}
															key={child.sub_title}
															className={`inline-flex items-center rounded-md py-1 text-base ${currentPage.startsWith('/diary/' + child.sub_href.split('/')[2]) ? 'font-semibold' : ''}`}>
															<span
																className="truncate max-w-xs transition duration-200 ease-in-out group-hover:-translate-y-1">{child.sub_title}</span>
															{child.sub_children && (<ChevronDown
																className="ml-1 h-5 w-5 text-gray-400 transition duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:rotate-180"
																aria-hidden="true"/>)}
														</Link>
													</TooltipTrigger>
													{child.sub_children && (
														<TooltipContent className="flex-col w-64 space-y-1 h-auto" key={child.sub_title}>
															{child.sub_children?.map((sub_child) => (
																<Link key={item.href} href={sub_child.sub_href} className='block items-center rounded-md hover:bg-gray-100 font-medium h-8 text-gray-500 hover:text-gray-700 pt-1'>
																	<div className={`inline-flex ${currentPage === sub_child.sub_href ? 'font-semibold text-black' : ''}`}>
																		{sub_child.svg}
																		<span className="px-1">{sub_child.sub_title}</span>
																	</div>
																</Link>
															))}
														</TooltipContent>
													)}
												</Tooltip>
											</div>
										))
									) : null)
								)}
							</nav>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
