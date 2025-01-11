'use client';

import * as React from 'react';
import { Profile } from '@prisma/client';
import NotificationButton from '@/components/header/notification-btn';
import UserButtonMb from '@/components/header/user-button-mb';

export default function MainHeader({ profile }: { profile: Profile }) {
	const [width, setWidth] = React.useState(0);

	React.useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	return (
		<>
			{width < 1200 && (
				<header className="2xm:hidden fixed top-0 z-10 w-full rounded-md bg-white">
					<div className="flex items-center flex-row-reverse justify-between w-full">
						<NotificationButton />
						<UserButtonMb profile={profile} />
					</div>
				</header>
			)}
		</>
	);
}
