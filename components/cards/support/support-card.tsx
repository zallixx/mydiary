'use client';

import {
	Card,
	CardContent
} from '@/components/ui/card';
import { SupportMessage } from '@prisma/client';
import { DataTable } from '@/components/data-tables/support/data-table';
import { columns } from '@/components/data-tables/support/columns';
import SupportCardHeader from '@/components/cards/support/support-card-header';

interface SupportCardProps {
	SupportMessages: SupportMessage[];
}

export default function SupportCard(params: Readonly<SupportCardProps>) {
	return (
		<>
			<Card className='w-full'>
				<SupportCardHeader />
				<CardContent>
					<DataTable columns={columns} data={params.SupportMessages} />
				</CardContent>
			</Card>
		</>
	);
}
