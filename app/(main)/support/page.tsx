'use client';

import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
    const router = useRouter();

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
                        <Button className="ml-auto" onClick={() => router.push('/support/new')}>Создать новое обращение</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
            </Card>
        </div>
    )
}