import InitializeProfile from '@/lib/initualize-profile';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from '@/components/theme-button';

export default async function SetupPage() {
    const profile = await InitializeProfile();

    if(profile.schoolId !== null) {
        const school = await db().school.findUnique({
            where: {
                id: profile.schoolId
            }
        });

        if (school) {
            redirect('/diary');
        }
    }

    return (
        <div className="flex justify-items-center items-center justify-center h-screen flex-col select-none">
            <Image src={'/fault-in-the-search.png'} alt={'Ошибка при поиске учебного заведения'} className="pointer-events-none" width={250} height={250} />
            <p className="dark:text-white text-[#101025] max-w-2xl text-center">
                В настоящее время информация о вашем зачислении в школу отсутствует.
                Возможно, стоит немного подождать, пока данные будут обновлены в системе.
                Если же по прошествии времени ситуация не изменится, рекомендуем вам
                обратиться в службу поддержки школы для получения более подробной
                информации и помощи или{' '}
                <Link href={'/support'} className="text-blue-500">написать в поддержку сайта дневника.</Link>
            </p>
            <ModeToggle />
        </div>
    );
}