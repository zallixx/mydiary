'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogHeader,
} from '@/components/ui/dialog';
import SupportMessageFormComponent from '@/components/forms/support-message-form';
import { useState } from 'react';

export default function SupportModal() {
	const [isModalOpened, setIsModalOpened] = useState(false);

	const handleChange = () => {
		setIsModalOpened(!isModalOpened);
	};

	return (
		<>
			<span
				className='cursor-pointer text-blue-500'
				onClick={handleChange}
			>
				написать в поддержку сайта дневника.
			</span>
			<Dialog open={isModalOpened} onOpenChange={handleChange}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Новое обращение в техническую поддержку
						</DialogTitle>
						<DialogDescription>
							Постарайтесь как можно подробнее описать вашу
							проблему.
						</DialogDescription>
						<SupportMessageFormComponent handleChange={handleChange} />
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
