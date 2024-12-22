'use client';

import * as React from 'react';
import { Profile } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { mainInfo, profileInfo } from '@/components/header/functions';
import MainLinks from '@/components/header/main-links';
import NotificationButton from '@/components/header/notification-btn';
import UserButtonPc from '@/components/header/user-button-pc';
import SubLinks from '@/components/header/sub-links';
import UserButtonMb from '@/components/header/user-button-mb';

export default function MainHeader({ profile }: { profile: Profile }) {
	const currentPage = usePathname();
	const mainComponents = mainInfo();
	const profileComponents = profileInfo();
	const [isClient, setIsClient] = React.useState(false);
	const [width, setWidth] = React.useState(0);

	React.useEffect(() => {
		setIsClient(true)
	}, [])

	React.useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isClient])

	return (
		<>
			<header className="fixed top-0 z-10 lg:translate-x-[-50%] lg:left-[50%] max-lg:w-full lg:min-w-[1400px] lg:w-auto rounded-md bg-white lg:px-2 dark:bg-[#17171a] transition-transform duration-500 ease-in-out">
				<div className="mx-auto px-1 sm:px-2 lg:px-4">
					<div className="flex h-12 lg:h-14 lg:justify-between max-lg:justify-start">
						<MainLinks mainComponents={mainComponents} currentPage={currentPage} />
						<div className="flex items-center lg:ml-4 lg:flex-row max-lg:flex-row-reverse max-lg:justify-between max-lg:w-full">
							<NotificationButton />
							{isClient && width >= 1400 && (
								<UserButtonPc profile={profile} profileComponents={profileComponents}  />
							)}
							{isClient && width <= 1400 && (
								<UserButtonMb profile={profile} />
							)}
						</div>
					</div>
				</div>
				<SubLinks mainComponents={mainComponents} currentPage={currentPage} />
			</header>
		</>
	);
}
