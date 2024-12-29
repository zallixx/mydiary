import { redirect } from 'next/navigation';
import SupportModal from '@/components/modals/support-modal';
import { CurrentProfile } from '@/lib/auth/current-profile';
import SetUpAvatarModal from "@/components/modals/avatar-modal";

export default async function SetupPage() {
	const { activated, profile } = await CurrentProfile();

	if (!activated || !profile) {
		return redirect('/sign-in');
	}

	// @ts-ignore
	if (profile.groups && profile.groups.length > 0) {
		redirect(`/diary/schedule/`);
	}

	return (
		<div className='flex h-screen select-none flex-col items-center justify-center justify-items-center'>
			<p className='max-w-2xl text-center text-[#101025] dark:text-white'>
				В настоящее время информация о вашем зачислении в школу
				отсутствует. Возможно, стоит немного подождать, пока данные
				будут обновлены в системе. Если же по прошествии времени
				ситуация не изменится, рекомендуем вам обратиться в службу
				поддержки школы для получения более подробной информации и
				помощи или <SupportModal />
			</p>
			<SetUpAvatarModal />
		</div>
	);
}
