'use server';

import { redirect } from 'next/navigation';
import { CurrentProfile } from '@/lib/auth/current-profile';
import React from 'react';
import {Button} from '@/components/ui/button';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/tabs';
import UpcomingHomeworks from '@/components/diary/tasks/upcoming-homeworks';
import PastHomeworks from '@/components/diary/tasks/past-homeworks';

export default async function TasksPage() {
	const { profile } = await CurrentProfile();

	if (!profile) {
		return redirect('/');
	} else if (profile.groups.length === 0) {
		return redirect('/');
	}

	return (
		<div>
			<Tabs defaultValue={'upcoming'}>
				<div className="min-h-screen flex items-start max-2xm:pt-16 2xm:pt-8 justify-center">
					<section className="static left-1/2 right-1/2 3xl:w-[1400px] 2xl:w-[1000px] flex flex-col transition duration-500 max-2xl:w-[95%] ease-in-out">
						<div className="flex flex-row justify-between max-2xm:justify-end items-end mb-2">
							<span className="max-sm:text-base text-2xl font-bold max-2xm:hidden">Домашние задания</span>
							<div className="flex space-x-2">
								<TabsList className="bg-transparent space-x-4">
									<TabsTrigger value={'upcoming'}>
										<Button variant="default" className="bg-[#0a3af5] max-sm:hover:bg-[#0a3af5] sm:hover:bg-[#0a3af5]/80 text-white rounded-lg">Ближайшие</Button>
									</TabsTrigger>
									<TabsTrigger value={'past'}>
										<Button variant="outline" className="text-black sm:hover:bg-[#a7a8a9]/30 rounded-lg">Прошедшие</Button>
									</TabsTrigger>
								</TabsList>
							</div>
						</div>

						<TabsContent value={'upcoming'}>
							<UpcomingHomeworks />
						</TabsContent>

						<TabsContent value={'past'}>
							<PastHomeworks />
						</TabsContent>
					</section>
				</div>
			</Tabs>
		</div>
	);
}
