'use client';

import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SupportMessage } from '@prisma/client';
import SupportModal from '@/components/modals/support-modal';
import { useState } from 'react';

export default function SupportCard({SupportMessages}: {SupportMessages: SupportMessage[]}) {
    const router = useRouter();
    const [isModalOpened, setIsModalOpened] = useState(false);

    const handleModalClose = () => {
        setIsModalOpened(false);
    };

    return (
        <div className="flex justify-items-center items-center justify-center h-screen select-none w-full max-w-screen-xl">
            <Card className="w-full">
                <CardHeader className="flex justify-between">
                    <div className="flex">
                        <div>
                            <CardTitle>Ваши обращения в техническую поддержку</CardTitle>
                            <CardDescription>
                                Здесь вы можете посмотреть статус своих обращений, написать новое обращение.{' '}
                                <br/>
                                <span onClick={() => router.back()} className="text-blue-500 cursor-pointer">Нажмите сюда, чтобы вернуться назад.</span>
                            </CardDescription>
                        </div>
                        <Button className="ml-auto" onClick={() => setIsModalOpened(true)}>Создать новое обращение</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-auto max-w-3xl">Название проблемы</TableHead>
                                <TableHead className="text-right">Статус</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {SupportMessages.map((message: SupportMessage) => (
                                <TableRow key={message.id}>
                                    <TableCell className="font-medium">{message.problemName}</TableCell>
                                    <TableCell className="text-right">{message.answer ? 'Отвечено' : 'Не отвечено'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                {isModalOpened && (
                    <SupportModal isOpened={isModalOpened} onClose={handleModalClose}/>
                )}
            </Card>
        </div>
    )
}