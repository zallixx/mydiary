'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SupportMessage } from '@prisma/client';
import SupportModal from '@/components/modals/support-modal';
import { useState } from 'react';
import { DataTable } from '@/components/data-tables/support/data-table';
import { columns } from '@/components/data-tables/support/columns';
import Link from 'next/link';

interface SupportCardProps {
    readonly SupportMessages: SupportMessage[];
}

export default function SupportCard(params: SupportCardProps) {
    const [isModalOpened, setIsModalOpened] = useState(false);

    const handleModalClose = () => {
        setIsModalOpened(false);
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex justify-between">
                    <div className="flex">
                        <div>
                            <CardTitle>Ваши обращения в техническую поддержку</CardTitle>
                            <CardDescription>
                                Здесь вы можете посмотреть статус своих обращений, написать новое обращение.{' '}
                                <br/>
                                <Link className="text-blue-500 cursor-pointer" href={'/'}>Нажмите сюда, чтобы вернуться в дневник</Link>
                            </CardDescription>
                        </div>
                        <Button className="ml-auto" onClick={() => setIsModalOpened(true)}>Создать новое обращение</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={params.SupportMessages} />
                </CardContent>
                {isModalOpened && (
                    <SupportModal isOpened={isModalOpened} onClose={handleModalClose}/>
                )}
            </Card>
        </>
    )
}