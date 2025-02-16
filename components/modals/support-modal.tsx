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

export default function SupportModal({ withoutText, open, setOpen }: { withoutText?: boolean; open?: boolean; setOpen?: Function; }) {
	const [isModalOpened, setIsModalOpened] = useState(open ?? false);

	const handleChange = () => {
		if (open !== undefined) {
			if (setOpen) {
				setOpen(!open);
			}
		} else {
			setIsModalOpened(!isModalOpened);
		}
	};

	return (
		<>
			{!withoutText && (
				<span className='cursor-pointer text-blue-500' onClick={handleChange}>
					написать в поддержку сайта дневника.
				</span>
			)}
			<Dialog open={open ?? isModalOpened} onOpenChange={handleChange}>
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