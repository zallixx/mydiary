'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { SupportMessage } from '@prisma/client';
import { DataTable } from '@/components/data-tables/support/data-table';
import { columns } from '@/components/data-tables/support/columns';
import Link from 'next/link';

interface SupportCardProps {
	SupportMessages: SupportMessage[];
}

export default function SupportCard(params: Readonly<SupportCardProps>) {
	return (
		<Card className='w-full'>
			<CardHeader className='flex justify-between'>
				<div className='flex'>
					<div>
						<CardTitle>Обращения в поддержку</CardTitle>
						<CardDescription>
							Здесь вы можете ответить на сообщения в поддержку.{' '}
							<br />
							<Link className='cursor-pointer text-blue-500' href={'/'}>
								Нажмите сюда, чтобы вернуться в дневник
							</Link>
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<DataTable columns={columns} data={params.SupportMessages} />
			</CardContent>
		</Card>
	);
}
