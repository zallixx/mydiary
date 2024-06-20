import InitializeProfile from '@/lib/initualize-profile';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { ModeToggle } from '@/components/theme-button';
import SupportModal from '@/components/modals/support-modal';

export default async function SetupPage() {
	const profile = await InitializeProfile();

	if (profile.classId !== null) {
		const Schoolclass = await db.class.findUnique({
			where: {
				id: profile.classId,
			},
		});

		const date = new Date().toLocaleDateString('ru-RU');

		if (Schoolclass) {
			redirect(`/diary/${date.split('.').join('-')}`);
		}
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
