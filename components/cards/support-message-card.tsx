import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {SupportMessage} from '@prisma/client';

interface SupportMessageCardProps {
    SupportMessage: SupportMessage;
}

export default async function SupportMessageCard(params: SupportMessageCardProps) {
    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex justify-between">
                    <div className="flex">
                        <div>
                            <CardTitle>Ваше обращение от {params.SupportMessage.createdAt.toLocaleString('ru-RU')}</CardTitle>
                            <CardDescription>
                                Здесь можно ознакомиться с вашим обращением.{' '}
                                <br/>
                                <Link className="text-blue-500 cursor-pointer" href={'/'}>Нажмите сюда, чтобы вернуться в дневник</Link>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </>
    );
}