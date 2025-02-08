import { redirect } from 'next/navigation';
import { CurrentProfile } from '@/lib/auth/current-profile';
import MarksPageClient from '@/components/diary/marks/markspage-client';
import React from 'react';

export default async function MarksPage() {
	const { profile } = await CurrentProfile();

	if (!profile) {
		return redirect('/');
	} else if (profile.groups.length === 0) {
		return redirect('/');
	}

	return (
		<div className="min-h-screen flex items-start max-2xm:pt-16 2xm:pt-8 justify-center">
			<section className="static left-1/2 right-1/2 3xl:w-[1400px] 2xl:w-[1000px] flex flex-col transition-hwp duration-500 max-2xl:w-[95%] ease-in-out">
				<div className="flex flex-row justify-between max-2xm:justify-end items-end">
					<span className="max-sm:text-base text-2xl font-bold max-2xm:hidden">Оценки</span>
				</div>
				<MarksPageClient/>
			</section>
		</div>
	);
}