import {
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

export default function SupportCardHeader() {
    return (
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
    );
}