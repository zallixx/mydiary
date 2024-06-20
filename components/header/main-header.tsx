'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { UserAvatar } from '@/components/user-avatar';
import { Profile } from '@prisma/client';

const studyCcomponents: { title: string; href: string; description: string }[] =
	[
		{
			title: 'Предметы',
			href: '/study/subjects',
			description: 'Список твоих предметов',
		},
		{
			title: 'Экзамены',
			href: '/study/exams',
			description: 'Твои экзамены',
		},
		{
			title: 'Академ. задолженности',
			href: '/study/academic-debt',
			description: 'Твои академ. задолженности',
		},
	];

const schoolComponents: { title: string; href: string; description: string }[] =
	[
		{
			title: 'Кружки',
			href: '/school/circles',
			description: 'Твои кружки',
		},
		{
			title: 'Посещаемость',
			href: '/school/attendance',
			description: 'Твоя посещаемость',
		},
		{
			title: 'О школе',
			href: '/school/about',
			description: 'Информация о школе',
		},
	];

const marksCcomponents: { title: string; href: string; description: string }[] =
	[
		{
			title: 'Оценки',
			href: '/marks',
			description: 'Твои оценки',
		},
		{
			title: 'Рейтинг',
			href: '/rating',
			description: 'Твой рейтинг',
		},
		{
			title: 'Архив оценок',
			href: '/marks/archive',
			description: 'Оценки прошлых лет',
		},
	];

const profileComponents: {
	title: string;
	href: string;
	description: string;
}[] = [
	{
		title: 'Профиль',
		href: '/profile',
		description: 'Твой профиль',
	},
	{
		title: 'Настройки',
		href: '/profile/settings',
		description: 'Настройки профиля',
	},
	{
		title: 'Выход',
		href: '/logout',
		description: 'Выход из аккаунта',
	},
];

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none'>
						{title}
					</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

export default function MainHeader({ profile }: { profile: Profile }) {
	const date = new Date().toLocaleDateString('ru-RU');

	return (
		<div>
			<NavigationMenu className='fixed left-[50%] top-0 z-10 translate-x-[-50%] rounded-md bg-white px-2 py-0.5 dark:bg-[#17171a]'>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link
							href={`/diary/${date.split('.').join('-')}`}
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Расписание
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Оценки</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]'>
								{marksCcomponents.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href='/homework' legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Задания
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Учеба</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]'>
								{studyCcomponents.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Школа</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]'>
								{schoolComponents.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							<UserAvatar profile={profile} />
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]'>
								{profileComponents.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
