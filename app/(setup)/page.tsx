import InitializeProfile from '@/lib/initualize-profile';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { ModeToggle } from '@/components/theme-button';
import SupportModal from '@/components/modals/support-modal';
import { auth } from '@clerk/nextjs/server';

export default async function SetupPage() {
	const profile = await InitializeProfile();

	if (!profile) {
		redirect(auth().redirectToSignIn());
	}

	// @ts-ignore
	if (profile.groups && profile.groups.length > 0) {
		redirect(`/diary/schedule/`);
	}

	return (
		<div className='flex h-screen select-none flex-col items-center justify-center justify-items-center'>
			<Image
				src={'/fault-in-the-search.png'}
				alt={'Ошибка при поиске учебного заведения'}
				className='pointer-events-none'
				width={250}
				height={250}
			/>
			<p className='max-w-2xl text-center text-[#101025] dark:text-white'>
				В настоящее время информация о вашем зачислении в школу
				отсутствует. Возможно, стоит немного подождать, пока данные
				будут обновлены в системе. Если же по прошествии времени
				ситуация не изменится, рекомендуем вам обратиться в службу
				поддержки школы для получения более подробной информации и
				помощи или <SupportModal />
			</p>
			<ModeToggle />
		</div>
	);
}
