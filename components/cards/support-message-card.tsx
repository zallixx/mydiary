'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { SupportMessage } from '@prisma/client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	SupportMessageAnswerFormOnSubmit,
	SupportMessageAnswerSchema,
} from '@/components/zod-schemas/forms/support-schema';

interface SupportMessageCardProps {
	SupportMessage: SupportMessage;
}

export default function SupportMessageCard(
	params: Readonly<SupportMessageCardProps>
) {
	const DefinedAnswerForm = useForm<
		z.infer<typeof SupportMessageAnswerSchema>
	>({
		resolver: zodResolver(SupportMessageAnswerSchema),
		defaultValues: {
			answer: '',
			supportMessageId: params.SupportMessage.id,
			// @ts-ignore
			profileEmail: params.SupportMessage.profile.email,
		},
	});

	return (
		<Card className='w-full'>
			<CardHeader className='flex justify-between'>
				<div className='flex'>
					<div>
						<CardTitle>Обращение от{' '} {params.SupportMessage.createdAt.toLocaleString('ru-RU')}</CardTitle>
						<CardDescription>
							Здесь можно ознакомиться с обращением. <br />
							<Link className='cursor-pointer text-blue-500' href={'/support'}>
								Нажмите сюда, чтобы вернуться к списку обращений
							</Link>
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h3 className='text-lg font-medium'>Тема проблемы</h3>
						<p>{params.SupportMessage.problemName}</p>
					</div>
					<div className='space-y-2'>
						<h3 className='text-lg font-medium'>
							Описание проблемы
						</h3>
						<p>{params.SupportMessage.problemDescription}</p>
					</div>
					<Form {...DefinedAnswerForm}>
						<form onSubmit={DefinedAnswerForm.handleSubmit(
								SupportMessageAnswerFormOnSubmit
							)}
						>
							<FormField
								name={'answer'}
								control={DefinedAnswerForm.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ответ</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												className='max-h-[200px]'
												placeholder='Опишите ваш ответ'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								className='ml-auto mt-3 flex'
								type='submit'
								disabled={
									DefinedAnswerForm.formState.isSubmitSuccessful ||
									DefinedAnswerForm.formState.isSubmitting ||
									params.SupportMessage.answer !== null
								}
							>
								Ответить
							</Button>
						</form>
					</Form>
				</div>
			</CardContent>
		</Card>
	);
}
